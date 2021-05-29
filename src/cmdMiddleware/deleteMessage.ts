import { MiddlewareMethod } from "../structures/CommandExecutor";

export const delMsgMiddleware: MiddlewareMethod = async (client, msg, args, next) => {
  await msg.delete();
  return next();
}