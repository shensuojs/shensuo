import { GatewayMessageCreateDispatchData } from 'discord-api-types/v10';
import { Client } from '../../';

export function MessageCreateHandler(client: Client, data: GatewayMessageCreateDispatchData) {
	console.log(data);
}
