import { isAdmin } from "../cmdMiddleware/isAdmin";
import CommandExecutor from "../structures/CommandExecutor";

const command = new CommandExecutor({
  name: "embed",
  description: "A command to test embeds.",
  args: [
    {
      name: 'name',
      type: 3, // string
      description: 'Name of the embed',
      required: true
    }
  ]
});

command.use(isAdmin);
command.setExecutor(async (client, interaction, res) => {
  const args = interaction.data.options ?? []
  if (!args[0]) return res(interaction, {
    type: 4,
    data: {
      content: 'Must specify a valid embed',
      flags: 64
    }
  })

  const embed = client.embeds.get(args[0].value)

  if (typeof embed === 'string') return res(interaction, {
    type: 4,
    data: {
      content: 'Must specify a valid embed',
      flags: 64
    }
  })

  res(interaction, {
    type: 4,
    data: {
      content: '',
      embeds: [embed]
    }
  })
});

export default command;
