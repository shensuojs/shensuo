import { GatewayIntentBits } from 'discord-api-types/v10';

export function parseIntents(intents: Array<GatewayIntentBits>): number {
	return intents.reduce((partialSum, a) => partialSum | a, 0);
}
