import { MiddlewareMethod } from "../structures/CommandExecutor";

export const hasRole = (role: string) => {
  const mid: MiddlewareMethod =  (client, interaction, next, res) => {
    if (interaction.member.roles.includes(role)) return next()

    res(interaction, {
      type: 4,
      data: {
        content: `You do not have the correct roles to run this command.`
      }
    })
    return;
  }
  return mid;
}
