import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "rules",
  category: "misc",
  description: "A command to fetch the server rules.",
  shortDescription: "Fetch the server rules."
});

command.use(isAdmin);
command.setExecutor(async (client, msg, args) => {
  await msg.delete();
  msg.channel.send(client.embeds.get('rules', {
    rules: client.cfg.rules,
    url: client.bot.user?.avatarURL() ?? ''
  }));
});

export default command;