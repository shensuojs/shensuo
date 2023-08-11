import { ClientEvents } from 'discord.js';
import { IShensuoEvents } from './interfaces';

export type UnionEvents = keyof ClientEvents | keyof IShensuoEvents;
export type IntersectedEvents = keyof ClientEvents & keyof IShensuoEvents;
