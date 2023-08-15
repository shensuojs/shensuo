import { APIMessage } from 'discord-api-types/v10';
import { Client } from '../../';

export class Message {
	public client: Client;
	public data: APIMessage;
	constructor(data: APIMessage, client: Client) {
		this.client = client;
		this.data = data;
	}
}
