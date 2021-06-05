import { MiddlewareMethod } from "../structures/CommandExecutor";

export const hasRole = (...roles: string[]) => {
  const mid: MiddlewareMethod =  (client, interaction, next) => {
    const roleChecks = roles.map(id => interaction.member?.roles.cache.has(id));
    if (!roleChecks.includes(false)) next();

    interaction.respond({
      type: 4,
      content: `You do not have the correct roles to run this command.`
    })
    return;
  }
  return mid;
}
