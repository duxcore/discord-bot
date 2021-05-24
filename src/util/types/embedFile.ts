import { MessageEmbed } from "discord.js";

export interface EmbedObject {
  name: string,
  getEmbed: (vals?: Object) => MessageEmbed
}