import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "clear",
  description: "Clear a number of chat messages",
  options: [
    {
      'name': 'number',
      'description': 'Number to clear',
      'type': 4
    }
  ]
});

command.use(isAdmin);
command.setExecutor((client, interaction) => {
  const args = interaction.raw.data.options ?? []
  interaction.channel.messages.fetch({limit: +args[0].value}).then(messages => {
    messages.forEach(msg => {
      msg.delete()
    })
  })
  interaction.respond({
    content: `Cleared ${args[0].value} messages`,
    isPrivate: true
  })
});

export default command;
