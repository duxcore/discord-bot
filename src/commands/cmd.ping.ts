import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "ping",
  category: "misc",
  description: "A simple test command",
  shortDescription: "A simple test command"
});

command.use(isAdmin);
command.setExecutor((msg, args) => {
  msg.reply("Pong!");
});

export default command;