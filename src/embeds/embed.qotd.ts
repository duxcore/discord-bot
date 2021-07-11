import { MessageEmbed } from 'discord.js'
import { EmbedObject } from '../util/types/embedFile'

export const embedObj: EmbedObject = {
  name: 'qotd',
  getEmbed(vals) {
    if (!vals) vals = {}

    const embed = new MessageEmbed()

    embed.setTitle('Question Of The Day!')
      .setColor(0xffffff)
      .setDescription(vals['qotd'])

    return embed
  }
}
