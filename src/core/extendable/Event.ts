import { EventEmitter } from 'events';
import { IntersectedEvents, UnionEvents } from '../';
export abstract class Event<T extends UnionEvents> extends EventEmitter {
	constructor(identifier: string) {
		super();
	}

	abstract listen(...args: IntersectedEvents[T]): void;
}
