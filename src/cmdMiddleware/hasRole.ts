import { MiddlewareMethod } from "../structures/CommandExecutor";

export const hasRole = (role: string) => {
  const mid: MiddlewareMethod =  (client, msg, args, next) => {
    const guild = msg.client.guilds.cache.get(msg.guild?.id ?? "");
    const author = guild?.members.cache.get(msg.author.id);

    if (author?.roles.cache.has(role)) return next()

    msg.delete().then(() => {
      msg.reply(`You must have the '${role}' role to run this command.`)
    })
    return;
  }
  return mid;
}
