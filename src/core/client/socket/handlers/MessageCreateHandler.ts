import { GatewayMessageCreateDispatchData } from 'discord-api-types/v10';
import { Client, Message } from '../../';

export function MessageCreateHandler(client: Client, data: GatewayMessageCreateDispatchData) {
	client.emit('messageCreate', new Message(data, client));
}
