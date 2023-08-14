import { EventEmitter } from 'events';
import { SocketManager } from './';
import { IClientEvents, IClientOptions } from '../';
import { GatewayIntentBits } from 'discord-api-types/v10';

export declare interface Client {
	on<K extends keyof IClientEvents>(event: K, listener: (...args: IClientEvents[K]) => void): this;
	once<K extends keyof IClientEvents>(event: K, listener: (...args: IClientEvents[K]) => void): this;
	emit<K extends keyof IClientEvents>(event: K, ...args: IClientEvents[K]): boolean;
	off<K extends keyof IClientEvents>(event: K, listener: (...args: IClientEvents[K]) => void): this;
	options: IClientOptions;
	socketManager: SocketManager;
	token: string;
}

export class Client extends EventEmitter {
	public socketManager: SocketManager;
	public token: string;
	public options: IClientOptions;
	constructor(token: string, options: IClientOptions) {
		super();

		this.token = token;

		this.options = options;

		this.socketManager = new SocketManager(this);
	}

	public async login() {
		await this.socketManager.connect();
	}
}