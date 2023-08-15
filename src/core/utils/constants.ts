import { MessageCreateHandler, GuildCreateHandler } from '../';

export const GatewayEventHandlers = Object.freeze({
	MESSAGE_CREATE: GuildCreateHandler,
	GUILD_CREATE: MessageCreateHandler,
});
