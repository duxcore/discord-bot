import { MessageEmbed } from "discord.js"
import { EmbedObject } from "../util/types/embedFile"

export const embedObj: EmbedObject = {
  name: "pull_request",
  getEmbed(vals) {
    if (!vals) vals = {}

    const embed = new MessageEmbed()

    embed.setTitle(vals['title'])
      .setDescription(vals['body'] ?? '*No description provided*')
      .setAuthor(vals['user'].login, vals['user'].avatar_url)
      .setFooter(vals['merged'] ? 'Merged' : (vals['state'] === 'open' ? 'Open' : 'Closed'))
      .setURL(vals['html_url'])
      .setTimestamp(new Date(vals['created_at']))
      .setColor(0xffffff)

    return embed
  }
}
