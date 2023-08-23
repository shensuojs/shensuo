import { APIMessage, Routes } from 'discord-api-types/v10';
import { Client } from '../../';
import { User } from './User';
import { Snowflake } from 'discord-api-types/globals';

const { channel } = Routes;

export class Message {
	public client: Client;
	public id: Snowflake;
	public channel_id: Snowflake;
	public channel: any;
	public author: User;
	public content: string | null;
	public timestamp: string;
	public edited_timestamp: string | null;
	public tts: boolean;
	public mentions: Array<User>; // Will be a union type of Role/User/Channel so we don't have multiple fields for essentially the same thing.
	public role_mentions: Array<any>;
	public channel_mentions?: Array<any>;
	constructor(data: APIMessage, client: Client) {
		this.client = client;
		this.id = data.id;
		this.channel_id = data.channel_id;
		this.author = data.author;
		this.content = data.content;
		this.timestamp = data.timestamp;
		this.edited_timestamp = data.edited_timestamp;
		this.tts = data.tts;
		this.mentions = data.mentions;
		this.role_mentions = data.mention_roles;
		this.channel_mentions = data.mention_channels;
	}

	async init() {
		const channelData = await this.client.requestManager.get(channel(this.channel_id));
		// this.channel =
	}
}
