import axios from "axios";
import { MessageEmbed } from "discord.js";
import { DuxcoreBot } from "../Bot";

export type MiddlewareMethod = (client: DuxcoreBot, interaction: any, next: () => void, response: ResponseMethod) => void;
export type ResponseMethod = (interaction: any, response: InteractionResponse) => Promise<void>
export type Executor = (client: DuxcoreBot, interaction: any, res: ResponseMethod) => void;
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

export interface InteractionResponse {
  type: number
  data: {
    tts?: boolean,
    content: string,
    embeds?: Array<MessageEmbed>,
    allowed_mentions?: Array<string>,
    flags?: number // set to 64 to make the message "ephemeral"
  }
}

const defaultExecutor: Executor = (client, interaction, res) => {
  return res(interaction, {
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

  /**
   * Respond to an interaction
   */
  public async respond(interaction, response: InteractionResponse) {
    axios.post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`, response)
  }

  public async execute(client: DuxcoreBot, interaction: any): Promise<CommandExecutor> {
    let proms: Promise<void>[] = []
    this._middlewareMethods.map(fn => proms.push(new Promise((res, _rej) => fn(client, interaction, res, this.respond))));

    if (proms.length > 0) await Promise.all(proms);

    this._executor(client, interaction, this.respond);
    return this;
  }
}
