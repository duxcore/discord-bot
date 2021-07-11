import { TextChannel } from "discord.js";
import { hasPermission } from "../cmdMiddleware/hasPermissions";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "post",
  description: "Ask a random question in a channel",
  options: [
    {
      name: 'channel',
      type: 7,
      description: 'Channel to post in'
    }
  ]
});

command.use(hasPermission('MANAGE_MESSAGES'))
command.setExecutor(async (client, interaction) => {
  const args = interaction.raw.data.options?.map(opt => opt) ?? []
  const channel = await client.bot.channels.fetch(args[0].value)
  if (!channel.isText()) return
  client.questionManager.post(channel as TextChannel)
  interaction.respond({
    content: 'Question posted to channel',
    isPrivate: true
  })
});

export default command;
