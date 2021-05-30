import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "ping",
  description: "A simple test command"
});

command.use(isAdmin)
command.setExecutor((client, interaction, res) => {
  res(interaction, {
    type: 4,
    data: {
      content: 'Pong!'
    }
  })
});

export default command;
