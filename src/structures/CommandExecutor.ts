import { Message } from "discord.js";
import { DuxcoreBot } from "../Bot";
import { delMsgMiddleware } from "../cmdMiddleware/deleteMessage";

export type MiddlewareMethod = (client: DuxcoreBot, msg: Message, args: string[], next: () => void) => void;
export type Executor = (client: DuxcoreBot, msg: Message, args: string[]) => void;
export interface CommandVals {
  name: string, // What is the command name (a.k.a. What you run in discord)
  category?: string, // The category that the command is in (defaults to "default")
  syntax?: string, // The syntax of the command
  shortDescription?: string, // What is the short description of this command (defaults to the command name)
  description?: string, // What is the full length description of this command (defaults to the command name)
  deleteMessage?: boolean, // Do you want to delete the original command message (defaults to false)?
}

const defaultExecutor: Executor = (client, msg, args) => { return msg.reply("This command has no executor"); }

export default class CommandExecutor {
  
  private _middlewareMethods: MiddlewareMethod[] = [];
  private _executor: Executor = defaultExecutor;
  
  private _name: string;
  private _category: string;
  private _shortDesc: string;
  private _desc: string;
  private _syntax: string;
  private _deleteMsg: boolean;
  
  constructor(vals?: CommandVals) {
    vals = vals ?? { name: "" } 

    this._name = vals.name;
    this._shortDesc = vals.shortDescription ?? this._name;
    this._desc = vals.description ?? this._name;
    this._category = vals.category ?? "default";
    this._syntax = vals.syntax ?? this._name;
    this._deleteMsg = vals.deleteMessage ?? false;

    if (this._deleteMsg) this._middlewareMethods.push(delMsgMiddleware);
  }

  get name(): string { return this._name; }
  get category(): string { return this._category; }
  get shortDescription(): string { return this._shortDesc; }
  get desciption(): string { return this._desc; }

  public use(...mwm: MiddlewareMethod[]): CommandExecutor {
    mwm.map(meth => this._middlewareMethods.push(meth));
    return this;
  }

  public setName(name: string): CommandExecutor {
    this._name = name;
    return this;
  }

  public setShortDesc(shortDesc: string): CommandExecutor {
    this._shortDesc = shortDesc;
    return this;
  }

  public setDesc(desc: string): CommandExecutor {
    this._desc = desc;
    return this;
  }

  public setExecutor(executor: Executor): CommandExecutor {
    this._executor = executor;
    return this;
  }

  public async execute(client: DuxcoreBot, message: Message): Promise<CommandExecutor> {
    const args = message.content.trim().split(/ +/g);
    args.shift();

    let proms: Promise<void>[] = []
    this._middlewareMethods.map(fn => proms.push(new Promise((res, _rej) => fn(client, message, args, res))));

    if (proms.length > 0) await Promise.all(proms);

    this._executor(client, message, args);
    return this;
  }

}