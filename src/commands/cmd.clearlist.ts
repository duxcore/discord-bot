import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "list",
  description: "List all questions in the queue"
});

command.setExecutor((client, interaction) => {
  client.questionManager.clear()
  interaction.respond({
    content: 'Question queue cleared'
  })
});

export default command;
