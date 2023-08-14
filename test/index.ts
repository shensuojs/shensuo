import { Client } from '../src';
import { GatewayIntentBits } from 'discord-api-types/v10';
import { TOKEN } from './config.example';

const client = new Client(TOKEN, {
	intents: [GatewayIntentBits.Guilds],
	sockets: 32,
});

client.on('ready', (client) => {
	// console.log('Logged in');
});

client.on('debug', console.log);

client.login();
