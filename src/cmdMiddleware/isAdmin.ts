import { MiddlewareMethod } from "../structures/CommandExecutor";

export const isAdmin: MiddlewareMethod = (client, msg, args, next) => {
  const guild = msg.client.guilds.cache.get(msg.guild?.id ?? "");
  const author = guild?.members.cache.get(msg.author.id);

  if (author?.permissions.has("ADMINISTRATOR")) next();
  else {
    msg.delete().then(() => {
      msg.reply("You must be an administrator to run this command...");
    });
    return;
  }
}