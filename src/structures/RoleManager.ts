import { ButtonComponent, ButtonStyle, ComponentActionRow, ComponentCluster } from "@duxcore/interactive-discord"
import { GuildMember } from "discord.js"
import { DuxcoreBot } from "../Bot"

export default class RoleManager {
  client: DuxcoreBot

  constructor(client: DuxcoreBot) {
    this.client = client
  }

  async start() {
    this.client.bot.guilds.cache.forEach(async guild => {
      let channel = guild.channels.cache.find(c => c.name.toLowerCase() === 'roles')

      if (!channel) channel = await guild.channels.create('roles', {
        type: 'text',
        permissionOverwrites: [
          {
            id: guild.roles.everyone,
            deny: ['SEND_MESSAGES']
          }
        ]
      })

      if (!channel.isText()) return

      this.client.interactions.on('buttonInteraction', async interaction => {
        const role = guild.roles.cache.find(r => r.name === interaction.customId)
        if (!role) return
        const user = new GuildMember(this.client.bot, {
          user: interaction.raw.member.user
        }, guild)
        if ((await user.fetch(true)).roles.cache.find(r => r.name === interaction.customId)) {
          user.roles.remove(role).then(() => interaction.respond({content: `Removed role: '${role}'`, isPrivate: true}))
        } else {
          user.roles.add(role).then(() => interaction.respond({content: `Received role: '${role}'`, isPrivate: true}))
        }
      })

      if ((await channel.messages.fetch()).size !== 0) channel.messages.cache.each(msg => msg.delete())

      const buttonList = Object.keys(this.client.cfg.roles).map(role => {
        return new ComponentActionRow(new ButtonComponent({ label: role, style: ButtonStyle.Primary, custom_id: role }))
      })

      const cluster = new ComponentCluster(...buttonList)

      this.client.interactions.sendComponents({
        channel,
        content: 'Use the buttons below to toggle your roles!',
        components: cluster
      })

      Object.keys(this.client.cfg.roles).forEach(async role => {
        if ((await guild.roles.fetch()).cache.find(r => r.name === role)) return
        guild.roles.create({ data: {name: role, color: this.client.cfg.roles[role]?.color} })
      })
    })
  }
}
