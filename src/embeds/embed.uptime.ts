import { MessageEmbed } from 'discord.js'
import { EmbedObject } from '../util/types/embedFile'

export const embedObj: EmbedObject = {
  name: 'uptime',
  getEmbed(vals) {
    if (!vals) vals = {}

    const rawSeconds = Math.floor(vals['uptime'] / 1000)
    const rawMinutes = Math.floor(rawSeconds / 60)
    const rawHours = Math.floor(rawMinutes / 60)

    const seconds = rawSeconds % 60
    const minutes = rawMinutes % 60
    const hours = rawHours % 24
    const days = Math.floor(rawHours / 24)

    const embed = new MessageEmbed()

    embed.setTitle('Bot Uptime.')
      .setFooter(`${days ? `${days} days, ` : ''}${hours ? `${hours} hours, ` : ''}${minutes ? `${minutes} minutes, ` : ''}${seconds} seconds`)
      .setColor(0xff2222)

    return embed
  }
}
