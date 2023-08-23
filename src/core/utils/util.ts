import { GatewayIntentBits } from 'discord-api-types/v10';

export function parseIntents(intents: Array<GatewayIntentBits>): number {
	return intents.reduce((partialSum, a) => partialSum | a, 0);
}

export async function getGatewayBot(token: string) {
	return await fetch('https://discord.com/api/v10/gateway/bot', {
		headers: {
			Authorization: `Bot ${token}`,
			'Content-Type': 'application/json',
		},
	}).then((res) => res.json());
}
