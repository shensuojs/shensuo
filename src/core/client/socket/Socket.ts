import { SocketManager } from './SocketManager';
import { EventEmitter } from 'events';
import { RawData, WebSocket } from 'ws';
import { GatewayEventHandlers, IWebsocketData, parseIntents } from '../../';
import { GatewayDispatchEvents, GatewayOpcodes } from 'discord-api-types/v10';

export class Socket extends EventEmitter {
	public socketManager: SocketManager = null!;
	public id: number;

	#socket?: WebSocket;
	#sequence: number | null;
	#session_id: string;
	#lastHeartbeat: number | null;
	#heartbeatInterval: NodeJS.Timeout | null;
	#heartbeatTimeout: number | null;
	#lastHeartbeatAck: number | null;
	#resumeGatewayUrl: string | null;

	constructor(id: number, socketManager: SocketManager) {
		super();

		this.id = id;
		this.socketManager = socketManager;

		this.#sequence = null;
		this.#session_id = '';
		this.#heartbeatInterval = null;
		this.#heartbeatTimeout = null;
		this.#lastHeartbeat = null;
		this.#lastHeartbeatAck = null;
		this.#resumeGatewayUrl = null;
	}

	connect() {
		if (this.#socket) {
			return Promise.resolve();
		}

		this.#socket = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

		this.#socket.on('message', this.#processMessage.bind(this));
	}

	async #send(data: IWebsocketData) {
		if (!this.#socket) return Promise.reject(new Error('WEBSOCKET_CONNECTION_NOT_FOUND'));
		if (data == null || !('d' in data && 'op' in data)) return Promise.reject(new Error('INVALID_REQUEST_SENT'));

		this.#socket.send(JSON.stringify(data));

		return Promise.resolve();
	}

	#debug(message: string) {
		this.socketManager.client.emit('debug', message);
	}

	#identify() {
		return this.#session_id && this.#sequence ? this.#resume() : this.#identifyNew();
	}

	#resume() {
		if (!this.#socket) return Promise.reject(new Error('WEBSOCKET_CONNECTION_NOT_FOUND'));

		this.#debug('Resuming connection to Gateway');

		this.#send({
			op: GatewayOpcodes.Resume,
			d: {
				token: this.socketManager.client.token,
				session_id: this.#session_id,
				seq: this.#sequence,
			},
		});

		return Promise.resolve();
	}

	#identifyNew() {
		if (!this.#socket) return Promise.reject(new Error('WEBSOCKET_CONNECTION_NOT_FOUND'));

		this.#debug(`Identifying (Shard: ${this.id})`);

		this.#send({
			op: GatewayOpcodes.Identify,
			d: {
				token: this.socketManager.client.token,
				intents: parseIntents(this.socketManager.client.options.intents),
				presence: this.socketManager.client.options.presence,
				shards: [this.id, this.socketManager.socketStore.size],
				properties: {
					os: 'linux',
					browser: 'shensuo',
					device: 'shensuo',
				},
			},
		});

		return Promise.resolve();
	}

	async #processMessage(message: RawData) {
		const data: IWebsocketData = JSON.parse(message.toString());

		if (this.#sequence && data.s && data.s > this.#sequence) {
			this.#sequence = data.s;
		}
		switch (data.op) {
			case GatewayOpcodes.Hello: {
				const interval = data.d.heartbeat_interval;
				this.#heartbeatTimeout = Math.floor(interval * Math.random());
				this.#debug(`Received Hello. First heartbeat in ${this.#heartbeatTimeout}ms (Interval - ${interval}ms`);

				this.#heartbeatInterval = setTimeout(() => {
					this.#lastHeartbeat = Date.now();
					this.#debug('Sending Heartbeat');
					this.#send({ op: GatewayOpcodes.Heartbeat, d: this.#sequence });
					this.#heartbeatInterval = setInterval(() => {
						this.#debug('Sending Heartbeat');
						this.#send({ op: GatewayOpcodes.Heartbeat, d: this.#sequence });
					}, interval);
				}, this.#heartbeatTimeout);

				await this.#identify();
				break;
			}
			case GatewayOpcodes.HeartbeatAck: {
				this.#debug('Received Ack');
				this.#lastHeartbeatAck = Date.now();
				break;
			}
			case GatewayOpcodes.Reconnect: {
				break;
			}
			case GatewayOpcodes.Dispatch: {
				switch (data.t) {
					case GatewayDispatchEvents.Ready: {
						this.#resumeGatewayUrl = data.d.resume_gateway_url;
						this.socketManager.client.emit('ready', this.socketManager.client);
						break;
					}
					default: {
						console.log(GatewayEventHandlers['GUILD_CREATE']); // returns undefined
					}
				}
			}
		}
	}
}
