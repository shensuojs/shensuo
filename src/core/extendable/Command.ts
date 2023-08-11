import { ApplicationCommandOptions, ICommandOptions } from '../index';
import { LocalizationMap } from 'discord-api-types/v10';
import { Interaction } from 'discord.js';

export abstract class Command {
	name: string;
	description: string;
	nameLocalizations: LocalizationMap | null;
	descriptionLocalizations: LocalizationMap | null;
	options?: Array<ApplicationCommandOptions>;
	nsfw?: boolean;
	constructor(options: ICommandOptions) {
		this.name = options.name;
		this.description = options.description;
		this.nameLocalizations = options.name_localizations;
		this.descriptionLocalizations = options.description_localizations;
		this.options = options.options;
		this.nsfw = options.nsfw;
	}

	abstract run(interaction: Interaction): void;
}
