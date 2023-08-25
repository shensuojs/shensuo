import { EventEmitter } from 'events';
import { Request, SocketManager } from './';
import { IClientEvents, IClientOptions } from '../';

export class Client extends EventEmitter {
	public socketManager: SocketManager;
	public token: string;
	public options: IClientOptions;
	public requestManager: Request;
	constructor(token: string, options: IClientOptions) {
		super();

		this.token = token;

		this.options = options;

		this.socketManager = new SocketManager(this);
		this.requestManager = new Request(this);
	}

	on<K extends keyof IClientEvents>(event: K, listener: (...args: IClientEvents[K]) => void): this {
		return super.on(event, listener as (...args: any[]) => void);
	}
	once<K extends keyof IClientEvents>(event: K, listener: (...args: IClientEvents[K]) => void): this {
		return super.once(event, listener as (...args: any[]) => void);
	}

	emit<K extends keyof IClientEvents>(event: K, ...args: IClientEvents[K]): boolean {
		return super.emit(event, ...args);
	}

	off<K extends keyof IClientEvents>(event: K, listener: (...args: IClientEvents[K]) => void): this {
		return super.off(event, listener as (...args: any[]) => void);
	}

	public async login() {
		await this.socketManager.connect();
	}
}
