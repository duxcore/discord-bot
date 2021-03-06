import { ButtonComponent, ButtonStyle, ComponentActionRow, ComponentCluster, ComponentType } from "@duxcore/interactive-discord"
import { TextChannel } from "discord.js"
import { DuxcoreBot } from "../Bot"

export default class RoleManager {
  client: DuxcoreBot

  constructor(client: DuxcoreBot) {
    this.client = client
  }

  async start() {
    if (Object.keys(this.client.cfg.roles).length > 25) throw Error('Too many roles! Maximum: 25')

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
        if (!interaction.member) return
        const user = await guild.members.fetch(interaction.member)
        if (user.roles.cache.find(r => r.name === interaction.customId)) {
          await user.roles.remove(role).then(() => interaction.respond({ content: `Removed role: '${role}'`, isPrivate: true }))
        } else {
          await user.roles.add(role).then(() => interaction.respond({ content: `Received role: '${role}'`, isPrivate: true }))
        }
      })

      let postNewRoles = false

      if ((await channel.messages.fetch()).size !== 0) {
        channel.messages.cache.each(async msg => {
          const message = await this.client.interactions.fetchMessage({ channel: channel as TextChannel, messageId: msg.id })
          const listOfRoles: string[] = []
          message.components[0].components.forEach(component => {
            if (component.type == ComponentType.Button) {
              listOfRoles.push(component.label || "")
            }
          })
          if (!Object.keys(this.client.cfg.roles).every((val, index) => val === listOfRoles[index])) postNewRoles = true
        })
      } else {
        postNewRoles = true;
      }

      if (!postNewRoles) return

      const buttonList: ComponentActionRow[] = []

      let currentList: ButtonComponent[] = []

      Object.keys(this.client.cfg.roles).forEach(role => {
        currentList.push(new ButtonComponent({ label: role, style: this.client.cfg.roles[role].btnStyle ?? ButtonStyle.Primary, custom_id: role }))
        if (currentList.length === 5) {
          buttonList.push(new ComponentActionRow(...currentList))
          currentList = []
        }
      })

      if (currentList.length !== 0) buttonList.push(new ComponentActionRow(...currentList))

      const cluster = new ComponentCluster(...buttonList)

      this.client.interactions.sendComponents({
        channel,
        content: 'Use the buttons below to toggle your roles!',
        components: cluster
      })

      Object.keys(this.client.cfg.roles).forEach(async role => {
        if ((await guild.roles.fetch()).cache.find(r => r.name === role)) return
        guild.roles.create({ data: { name: role, color: this.client.cfg.roles[role]?.color } })
      })
    })
  }
}
