import { MiddlewareMethod } from "../structures/CommandExecutor";

export const cooldown = (timeout: number) => {
  const cooldowns = new Set()

  const mid: MiddlewareMethod = (client, interaction, next) => {
    if (cooldowns.has(interaction.member?.user.id)) return interaction.respond({
      type: 4,
      content: `You must wait before activating this command. Cooldown is ${(timeout / 1000).toFixed(0)} second(s)`,
      isPrivate: true
    })

    cooldowns.add(interaction.member?.user.id)
    setTimeout(() => {
      cooldowns.delete(interaction.member?.user.id)
    }, timeout)

    next()
  }
  return mid;
}
