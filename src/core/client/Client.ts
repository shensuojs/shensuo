import { EventEmitter } from 'events';
import { Request, SocketManager } from './';
import { IClientEvents, IClientOptions } from '../';

declare module 'node:events' {
	class EventEmitter {
		public static once<E extends EventEmitter, K extends keyof IClientEvents>(
			eventEmitter: E,
			eventName: E extends Client ? K : string /* eslint-disable  @typescript-eslint/no-explicit-any */,
		): Promise<E extends Client ? IClientEvents[K] : any[]>;
		public static on<E extends EventEmitter, K extends keyof IClientEvents>(
			eventEmitter: E,
			eventName: E extends Client ? K : string,
		): AsyncIterableIterator<E extends Client ? IClientEvents[K] : any>;
	}
}

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
