import { hasPermission } from "../cmdMiddleware/hasPermissions";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "ask",
  description: "Add a question to the QOTD queue",
  options: [
    {
      name: 'question',
      type: 3,
      description: 'Ask a question',
      required: true
    }
  ]
});

command.use(hasPermission('MANAGE_MESSAGES'))
command.setExecutor((client, interaction) => {
  const args = interaction.raw.data.options?.map(opt => opt) ?? []
  client.questionManager.askQuestion(args[0].value)
  interaction.respond({
    content: 'Question added to list',
    isPrivate: true
  })
});

export default command;
