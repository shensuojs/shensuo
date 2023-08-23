import { EventEmitter } from 'events';
import { Client, getGatewayBot, Store } from '../../';
import { Socket } from './Socket';
import { APIGatewayBotInfo } from 'discord-api-types/v10';
import { setTimeout as setPromisedTimeout } from 'node:timers/promises';

export class SocketManager extends EventEmitter {
	public client: Client;
	public socketStore: Store<number, Socket> = new Store<number, Socket>();
	public sockets: number | 'auto';

	#bucket: Array<number> = null!;

	constructor(client: Client) {
		super();

		this.client = client;

		this.sockets = this.client.options.sockets ?? 1;
	}

	async #createSockets() {
		const data: APIGatewayBotInfo = await getGatewayBot(this.client.token);

		const shards = this.sockets === 'auto' ? data.shards : this.sockets;

		for (let id = 0; id < shards; id++) this.socketStore.set(id, new Socket(id, this));
	}

	async connect() {
		if (this.socketStore.size <= 0) await this.#createSockets();
		const { session_start_limit }: APIGatewayBotInfo = await getGatewayBot(this.client.token);

		const maxConcurrency = session_start_limit.max_concurrency;

		this.#bucket = Array(maxConcurrency).fill(0);

		for (const [id, socket] of this.socketStore) {
			const shard_bucket = id % session_start_limit.max_concurrency;
			const previous = this.#bucket[shard_bucket];
			const current = Date.now();
			if (current - previous < 5_000) {
				await setPromisedTimeout(5_000);
			}
			this.#bucket[shard_bucket] = current;
			await socket.connect();
		}
	}
}
