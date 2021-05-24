import { MessageEmbed } from "discord.js";
import { EmbedObject } from "../util/types/embedFile";

export const embedObj: EmbedObject = {
  name: "error",
  getEmbed(vals) {
    if (!vals) vals = {}

    const embed = new MessageEmbed();

    embed.setTitle(vals['name'] ?? "Error")
      .setDescription(vals['message'] ?? 'An unknown error occured')
      .setColor("red")

    return embed;
  }
}