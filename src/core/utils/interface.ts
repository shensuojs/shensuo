import { GatewayIntentBits, GatewayPresenceUpdateData, GatewayReadyDispatchData } from 'discord-api-types/v10';
import { Client } from '../';

export interface IWebsocketData {
	op: number; // used to identify what gateway event is coming in
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
}
