import { MessageCreateHandler, GuildCreateHandler } from '../client/socket/handlers';

export const GatewayEventHandlers = Object.freeze({
	MESSAGE_CREATE: MessageCreateHandler,
	GUILD_CREATE: GuildCreateHandler,
});
