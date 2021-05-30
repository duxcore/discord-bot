import { MiddlewareMethod } from "../structures/CommandExecutor";

export const isAdmin: MiddlewareMethod = (client, interaction, next, response) => {
  const guild = client.bot.guilds.cache.get(interaction.guild_id ?? "");
  const author = guild?.members.cache.get(interaction.member.user.id);

  if (author?.permissions.has("ADMINISTRATOR")) next();
  else {
      response(interaction, {
        type: 4,
        data: {
          content: "You must be an administrator to run this command...",
        }
      });
    return;
  }
}
