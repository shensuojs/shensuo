import { GatewayMessageCreateDispatchData } from 'discord-api-types/v10';
import { Client, Message } from '../../';

export async function MessageCreateHandler(client: Client, data: GatewayMessageCreateDispatchData) {
	const message = new Message(data, client);
	await message.init();
	client.emit('messageCreate', message);
}
