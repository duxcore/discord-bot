import { PermissionResolvable } from "discord.js";
import { MiddlewareMethod } from "../structures/CommandExecutor";

export const hasPermission = (...roles: PermissionResolvable[]) => {
  const mid: MiddlewareMethod =  (client, interaction, next) => {
    const checks = roles.map(id => interaction.member?.hasPermission(id));
    if (!checks.includes(false)) next();

    interaction.respond({
      type: 4,
      content: `You do not have the correct permissions to run this command.`,
      isPrivate: true
    })
    return;
  }
  return mid;
}
