import { Collection } from 'discord.js';
import { Event } from '../extendable';

export class EventManager {
	events: Collection<string, Event<any>> = new Collection<string, Event<any>>();

	loadAllEvents() {
		// will eventually read from the events directory in your project root dir (e.g src dir)
	}
}
