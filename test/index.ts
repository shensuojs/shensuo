import { Client } from '../src';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { TOKEN } from './config';

const client = new Client(TOKEN, {
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
	sockets: 'auto',
});

client.on('ready', (client) => {
	console.log(client);
});

client.on('messageCreate', (message) => {
	console.log(message);
});

client.on('debug', console.log);

client.login();
