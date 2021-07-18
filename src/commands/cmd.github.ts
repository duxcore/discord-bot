import axios from "axios"
import { cooldown } from "../cmdMiddleware/cooldown"
import CommandExecutor from "../structures/CommandExecutor"

const command = new CommandExecutor({
  name: "github",
  description: "Fetch a github issue/pr",
  options: [
    {
      name: 'number',
      type: 4, // int
      description: 'GitHub issue/pr id',
      required: true
    }
  ]
})

command.use(cooldown(10000))
command.setExecutor(async (client, interaction) => {
  const args = interaction.raw.data.options ?? []
  if (!args[0]) return interaction.respond({
      content: 'Must provide an id',
      isPrivate: true
  })

  let res

  try {
    res = await axios.get(`https://api.github.com/repos/duxcore/duxcore/issues/${args[0].value}`)
  } catch (err) {
    res = err
  }

  if (res.status !== 200) {
    const embed = client.embeds.get('error', { message: 'No issue/pr found'+res.message })
    return interaction.respond({
      embeds: typeof embed !== 'string' ? [embed] : undefined,
      isPrivate: true
    })
  }

  try {
    if (res.data.pull_request) res = await axios.get(`https://api.github.com/repos/duxcore/duxcore/pulls/${args[0].value}`)
  } catch (err) {
    res = err
  }

  let embed = res.data.commits ? client.embeds.get('pull_request', res.data) : client.embeds.get('issue', res.data)

  if (typeof embed === 'string') {
    const embed = client.embeds.get('error')
    return interaction.respond({
      embeds: typeof embed !== 'string' ? [embed] : undefined,
      isPrivate: true
    })
  }

  interaction.respond({
    content: '',
    embeds: [embed]
  })
})

export default command
