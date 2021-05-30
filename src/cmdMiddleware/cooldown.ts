import { MiddlewareMethod } from "../structures/CommandExecutor";

export const cooldown = (timeout: number) => {
  const cooldowns = new Set()

  const mid: MiddlewareMethod = (client, interaction, next, res) => {
    if (cooldowns.has(interaction.member.user.id)) return res(interaction, {
      type: 4,
      data: {
        content: `You must wait before activating this command. Cooldown is ${(timeout / 1000).toFixed(0)} second(s)`
      }
    })

    cooldowns.add(interaction.member.user.id)
    setTimeout(() => {
      cooldowns.delete(interaction.member.user.id)
    }, timeout)

    next()
  }
  return mid;
}
