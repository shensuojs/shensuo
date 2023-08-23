import { Client } from '../Client';

export class Request {
	client: Client;
	#baseUrl: string = 'https://discord.com/api/v10';

	constructor(client: Client) {
		this.client = client;
	}

	async get(route: string) {
		return await fetch(this.#baseUrl + route, {
			headers: { Authorization: `Bot ${this.client.token}` },
		}).then((res) => res.json());
	}

	async patch(route: string, data: string) {
		return await fetch(this.#baseUrl + route, {
			headers: { Authorization: `Bot ${this.client.token}` },
			body: JSON.stringify(data),
			method: 'PATCH',
		});
	}
}
