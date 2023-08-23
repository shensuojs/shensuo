import { GatewayGuildCreateDispatchData } from 'discord-api-types/v10';
import { Client } from '../../';

export function GuildCreateHandler(client: Client, data: GatewayGuildCreateDispatchData) {
	return {
		client,
		data,
	};
}
