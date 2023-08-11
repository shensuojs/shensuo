import { Client, ClientOptions } from 'discord.js';
import { TranslationManager, EventManager, CommandManager } from '../extendable';

declare module 'discord.js' {
	export interface Client {
		translationManager?: TranslationManager;
		eventManager?: EventManager;
		commandManager?: CommandManager;
	}
}

export class ShensuoClient extends Client {
	constructor(options: ClientOptions) {
		super(options);
	}
}
