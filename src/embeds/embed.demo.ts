import { MessageEmbed } from "discord.js";
import { EmbedObject } from "../util/types/embedFile";

export const embedObj: EmbedObject = {
  name: "demo",
  getEmbed(vals) {
    const embed = new MessageEmbed();

    embed.setTitle("This is a demo embed")
         .setColor("blue")

    return embed;
  }
}