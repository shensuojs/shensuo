export class BaseChannel {
	public data: { id: string; type: number };
	constructor(data: { id: string; type: number }) {
		this.data = data;
	}
}
