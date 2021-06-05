import { ApplicationCommandOption, ApplicationCommandPermissions, CommandInteractionController, SlashCommand, SlashCommandOptions } from "@duxcore/interactive-discord";
import { DuxcoreBot } from "../Bot";

export type MiddlewareMethod = (client: DuxcoreBot, interaction: CommandInteractionController, next: () => void) => void;
export type Executor = (client: DuxcoreBot, interaction: CommandInteractionController) => void;
export type CommandOption = ApplicationCommandOption;
export interface CommandVals {
  name: string, // What is the command name (a.k.a. What you run in discord)
  description?: string, // What is the full length description of this command (defaults to the command name)
  options?: ApplicationCommandOption[],
  permissions?: ApplicationCommandPermissions[]
}

const defaultExecutor: Executor = (client, interaction) => {
  return interaction.respond({
    content: "This command has no executor"
  })
}

export default class CommandExecutor {
  
  private _middlewareMethods: MiddlewareMethod[] = [];
  private _executor: Executor = defaultExecutor;
  private _slashCommand: SlashCommand;
  
  private _name: string;
  private _desc: string;
  private _options: Array<ApplicationCommandOption>;
  private _permissions: ApplicationCommandPermissions[];
  
  constructor(vals: (SlashCommandOptions)) {
    this._name = vals.name;
    this._desc = vals.description
    this._options = vals.options ?? [];
    this._permissions = vals.permissions ?? []

    const slashCommand = new SlashCommand(vals);
    this._slashCommand = slashCommand
  }

  get name(): string { return this._name; }
  get options(): ApplicationCommandOption[] { return this._options; }
  get desciption(): string { return this._desc; }
  get permissions(): ApplicationCommandPermissions[] { return this._permissions; }

  get slashCommand(): SlashCommand { return this._slashCommand; }

  public use(...mwm: MiddlewareMethod[]): CommandExecutor {
    mwm.map(meth => this._middlewareMethods.push(meth));
    return this;
  }

  public setExecutor(executor: Executor): CommandExecutor {
    this._executor = executor;
    return this;
  }
  
  public async execute(client: DuxcoreBot, interaction: CommandInteractionController): Promise<CommandExecutor> {
    let proms: Promise<void>[] = []
    this._middlewareMethods.map(fn => proms.push(new Promise((res, _rej) => fn(client, interaction, res))));
    if (proms.length > 0) await Promise.all(proms);

    this._executor(client, interaction);
    return this;
  }
}
