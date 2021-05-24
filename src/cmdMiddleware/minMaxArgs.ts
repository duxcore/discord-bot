import { MiddlewareMethod } from "../structures/CommandExecutor";

export const minMaxArgs = (min: number, max?: number) => {
  const mid: MiddlewareMethod =  (client, msg, args, next) => {
    const numArgs = args.length;

    if (numArgs < min) return msg.reply("Not enough arguments");
    if (max !== undefined && numArgs > max) return msg.reply("Too many arguments");

    return next();
  }
  return mid;
}