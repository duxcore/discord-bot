import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "ping",
  category: "misc",
  description: "A simple test command",
  shortDescription: "A simple test command",
  deleteMessage: true
});

command.use(isAdmin);
command.setExecutor((client, msg, args) => {
  msg.reply("Pong!");
});

export default command;