import { APIGuild } from 'discord-api-types/v10';
import { Snowflake } from 'discord-api-types/globals';

export class Guild {
	public id: Snowflake;

	constructor(data: APIGuild) {}
}
