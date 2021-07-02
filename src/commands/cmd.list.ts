import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "list",
  description: "List all questions in the queue"
});

command.setExecutor((client, interaction) => {
  interaction.respond({
    content: `Question Queue:\n${client.questionManager.getAll().join(',\n')}`,
    isPrivate: true
  })
});

export default command;
