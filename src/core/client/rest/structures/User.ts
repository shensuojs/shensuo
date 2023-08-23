import { Snowflake } from 'discord-api-types/globals';
import { APIUser, UserFlags } from 'discord-api-types/v10';

export class User {
	public id: Snowflake;
	public username: string;
	public avatar: string | null;
	public bot?: boolean = false;
	public flags?: UserFlags;
	constructor(data: APIUser) {
		this.id = data.id;
		this.username = data.username;
		this.avatar = data.avatar;
		this.bot = data.bot;
		this.flags = data.flags;
	}
}
