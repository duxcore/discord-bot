import { MessageEmbed } from 'discord.js';
import { EmbedObject } from '../util/types/embedFile';

export const embedObj: EmbedObject = {
  name: 'rules',
  getEmbed(vals) {
    if (!vals || !vals['rules']) throw Error('No rules defined')

    const embed = new MessageEmbed();

    embed.setTitle('Server Rules')
      .setAuthor('Duxcore Discord', vals['url'])
      .addFields(vals['rules'].map(rule => {
        return {
          name: rule.name,
          value: rule.message
        }
      }))
      .setColor(0xffffff)

    return embed;
  }
}
