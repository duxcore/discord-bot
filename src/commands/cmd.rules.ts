import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";
import { TextChannel } from "discord.js"

const command = new CommandExecutor({
  name: "rules",
  description: "A command to fetch the server rules."
});

// command.use(isAdmin);
command.setExecutor((client, interaction) => {
  const embed = client.embeds.get('rules', {
    rules: client.cfg.rules,
    url: client.bot.user?.avatarURL() ?? ''
  })
  interaction.respond({
    type: 4,
    data: {
      content: '',
      embeds: typeof(embed) !== 'string' ? [embed] : undefined
    }
  })
});

export default command;
