import { isAdmin } from '../cmdMiddleware/isAdmin'
import CommandExecutor from '../structures/CommandExecutor'

const command = new CommandExecutor({
  name: 'uptime',
  category: 'misc',
  description: 'Find the uptime of the bot',
  shortDescription: 'Uptime of the bot'
})

command.use(isAdmin)
command.setExecutor((client, msg, args) => {
  msg.channel.send(client.embeds.get('uptime', {
    uptime: client.uptime
  }))
})

export default command
