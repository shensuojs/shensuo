import { ApplicationCommandOptionType, LocalizationMap } from 'discord-api-types/v10';

export interface IShensuoClientOptions {}

export interface ApplicationCommandOptions {
	type: ApplicationCommandOptionType;
	name: string;
	name_localizations?: LocalizationMap | null;
	description: string;
	description_localizations?: LocalizationMap | null;
	required?: boolean;
}

export interface ICommandOptions {
	name: string;
	description: string;
	name_localizations: LocalizationMap | null;
	description_localizations: LocalizationMap | null;
	options?: Array<ApplicationCommandOptions>;
	nsfw?: boolean;
}

export interface IShensuoEvents {}
