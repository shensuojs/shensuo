import { User } from './User';
import { APIUser } from 'discord-api-types/v10';

export class ClientUser extends User {
	bot = true;
	constructor(data: APIUser) {
		super(data);
	}
}
