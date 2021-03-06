import { MiddlewareMethod } from "../structures/CommandExecutor";

export const isAdmin: MiddlewareMethod = (client, interaction, next) => {
  if (interaction.member?.hasPermission("ADMINISTRATOR")) next();
  else {
      interaction.respond({
        type: 4,
        content: "You must be an administrator to run this command...",
        isPrivate: true
      });
    return;
  }
}
