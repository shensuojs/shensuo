import { GatewayIntentBits, GatewayPresenceUpdateData } from 'discord-api-types/v10';
import { Client, Message } from '../';

export interface IWebsocketData {
	op: number; // used to identify what gateway event is coming in
	/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
	d: any; // data sent with the event
	t?: null | string; // what dispatch event is being sent
	s?: null | number; // sequence number
}

export interface IClientOptions {
	intents: Array<GatewayIntentBits>;
	presence?: GatewayPresenceUpdateData;
	sockets?: number | 'auto';
}

export interface IClientEvents {
	ready: [data: Client];
	debug: [message: string];
	messageCreate: [message: Message];
}
