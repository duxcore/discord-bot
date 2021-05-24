import { isAdmin } from "../cmdMiddleware/isAdmin";
import { minMaxArgs } from "../cmdMiddleware/minMaxArgs";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "embed",
  category: "misc",
  description: "A command to test embeds.",
  shortDescription: "A command to test embeds."
});

command.use(isAdmin, minMaxArgs(1, 1));
command.setExecutor((client, msg, args) => {
  msg.channel.send(client.embeds.get(args[0]));
});

export default command;