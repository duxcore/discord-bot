import axios from "axios";
import { MessageEmbed } from "discord.js";
import { DuxcoreBot } from "../Bot";
import { InteractionController } from "../classes/InteractionController";
import { InteractionResponse } from "../util/types/interactions";

export type MiddlewareMethod = (client: DuxcoreBot, interaction: InteractionController, next: () => void) => void;
export type Executor = (client: DuxcoreBot, interaction: InteractionController) => void;
export interface CommandArgument {
  type: number,
  name: string,
  description: string,
  required?: boolean,
  choices?: Array<Record<string, string | number>>
}
export interface CommandVals {
  name: string, // What is the command name (a.k.a. What you run in discord)
  description?: string, // What is the full length description of this command (defaults to the command name)
  args?: CommandArgument[]
}

const defaultExecutor: Executor = (client, interaction) => {
  return interaction.respond({
    type: 4,
    data: {
      content: "This command has no executor"
    }
  })
}

export default class CommandExecutor {
  
  private _middlewareMethods: MiddlewareMethod[] = [];
  private _executor: Executor = defaultExecutor;
  
  private _name: string;
  private _desc: string;
  private _args: Array<CommandArgument>;
  
  constructor(vals?: CommandVals) {
    vals = vals ?? { name: "" }

    this._name = vals.name;
    this._args = vals.args ?? []
    this._desc = vals.description ?? this._name;
  }

  get name(): string { return this._name; }
  get args(): CommandArgument[] { return this._args }
  get desciption(): string { return this._desc; }

  public use(...mwm: MiddlewareMethod[]): CommandExecutor {
    mwm.map(meth => this._middlewareMethods.push(meth));
    return this;
  }

  public setName(name: string): CommandExecutor {
    this._name = name;
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
  
  public async execute(client: DuxcoreBot, interaction: InteractionController): Promise<CommandExecutor> {
    let proms: Promise<void>[] = []
    this._middlewareMethods.map(fn => proms.push(new Promise((res, _rej) => fn(client, interaction, res))));

    if (proms.length > 0) await Promise.all(proms);

    this._executor(client, interaction);
    return this;
  }
}
