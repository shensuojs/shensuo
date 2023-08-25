import { APIGuildMember, GuildMemberFlags, Snowflake } from 'discord-api-types/v10';
import { User } from './User';
import { Client } from '../../Client';
import { Guild } from './Guild';

export class GuildMember {
	public user: User;
	public nickname?: string | null;
	public roles: Snowflake[];
	public joinedAt: string;
	public premiumSince?: string | null;
	public deaf: boolean;
	public mute: boolean;
	public pending?: boolean;
	public flags: GuildMemberFlags;
	public permissions?: string;
	public communication_disabled_until?: string | null;
	public guild: Guild;
	public client: Client;
	constructor(client: Client, data: APIGuildMember, guild: Guild) {
		this.client = client;
		this.user = new User(data.user!);
		this.nickname = data.nick;
		this.roles = data.roles;
		this.joinedAt = data.joined_at;
		this.premiumSince = data.premium_since;
		this.deaf = data.deaf;
		this.mute = data.mute;
		this.pending = data.pending;
		this.flags = data.flags;
		this.communication_disabled_until = data.communication_disabled_until;
		this.guild = guild;
	}
}
