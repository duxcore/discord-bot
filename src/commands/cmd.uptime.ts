import { isAdmin } from '../cmdMiddleware/isAdmin'
import CommandExecutor from '../structures/CommandExecutor'

const command = new CommandExecutor({
  name: 'uptime',
  description: 'Find the uptime of the bot',
})

command.use(isAdmin)
command.setExecutor((client, interaction) => {
  const embed = client.embeds.get('uptime', {uptime: client.uptime})
  interaction.respond({
    type: 4,
    data: {
      content: '',
      embeds: typeof(embed) !== 'string' ? [embed] : undefined
    }
  })
})

export default command
