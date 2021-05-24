import { MessageEmbed } from "discord.js";
import { EmbedObject } from "../util/types/embedFile";

export const embedObj: EmbedObject = {
  name: "error",
  getEmbed(vals) {
    const embed = new MessageEmbed();

    embed.setTitle("Error")
         .setColor("red")

    return embed;
  }
}