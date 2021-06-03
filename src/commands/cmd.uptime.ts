import { Logger } from '../classes/Logger'
import { cooldown } from '../cmdMiddleware/cooldown'
import { isAdmin } from '../cmdMiddleware/isAdmin'
import CommandExecutor from '../structures/CommandExecutor'

const command = new CommandExecutor({
  name: 'uptime',
  description: 'Find the uptime of the bot',
  default_permissions: true
})

command.use(isAdmin, cooldown(10000))
command.setExecutor((client, interaction) => {
  const embed = client.embeds.get('uptime', {uptime: client.uptime})
  interaction.respond({
    content: '',
    embeds: typeof(embed) !== 'string' ? [embed] : undefined
  }).catch(console.error);
})

export default command
