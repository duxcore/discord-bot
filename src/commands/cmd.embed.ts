import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "embed",
  description: "A command to test embeds.",
  options: [
    {
      name: 'name',
      type: 3, // string
      description: 'Name of the embed',
      required: true
    }
  ]
});

command.use(isAdmin);
command.setExecutor(async (client, interaction) => {
  const args = interaction.raw.data.options?.map(opt => opt) ?? []
  if (!args[0]) return interaction.respond({
      content: 'Must specify a valid embed',
      isPrivate: true
  })

  const embed = client.embeds.get(args[0].value)

  if (typeof embed === 'string') return interaction.respond({
      content: 'Must specify a valid embed',
      isPrivate: true
    });

  interaction.respond({
    content: '',
    embeds: [embed]
  });
});

export default command;
