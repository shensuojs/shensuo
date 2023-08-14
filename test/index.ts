import { Client } from '../src';
import { GatewayIntentBits } from 'discord-api-types/v10';

const client = new Client('MTEyODYwMDgyNjc1MjAwODE5Mg.G9j5WU.xeqo3hJI3dv62m-fa8SQWG8aTwU44oTRQou-_E', {
	intents: [GatewayIntentBits.Guilds],
	sockets: 32,
});

client.on('ready', (client) => {
	// console.log('Logged in');
});

client.on('debug', console.log);

client.login();
