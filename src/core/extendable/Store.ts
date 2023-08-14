export class Store<K, V> extends Map<K, V> {
	public first(): V | undefined {
		return this.values().next().value;
	}

	public at(index: number): V {
		return [...this.values()][Math.floor(index)];
	}

	public keyAt(index: number): K {
		return [...this.keys()][Math.floor(index)];
	}
}
