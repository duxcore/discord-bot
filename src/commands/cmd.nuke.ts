import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "nuke",
  description: "Nuke the chat"
});

command.use(isAdmin);
command.setExecutor((client, interaction) => {
  interaction.channel.messages.fetch().then(messages => {
    messages.forEach(msg => {
      msg.delete()
    })
  })
  interaction.respond({
    content: 'Nuked',
    isPrivate: true
  })
});

export default command;
