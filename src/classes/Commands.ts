import axios, { AxiosError } from "axios";
import { Collection, Snowflake } from "discord.js";
import { glob } from "glob";
import { DuxcoreBot } from "../Bot";
import CommandExecutor from "../structures/CommandExecutor";
import { Logger } from "../classes/Logger";
import { SlashCommand } from "@duxcore/interactive-discord";

export class Commands {

  public client: DuxcoreBot;
  public cache: Collection<string, CommandExecutor> = new Collection();

  constructor(client: DuxcoreBot, prefix: string) {
    this.client = client;

    this.startListener(prefix);
  }

  register(dir: string): Promise<Commands> {
    return new Promise(async (resolve, reject) => {
      const ext = (__filename.endsWith("ts") ? "ts" : "js");
      glob(`${dir}/**/cmd.*.${ext}`, async (err, files) => {
        const pendingCmds = files.map(f => {
          const imported = require(f);
          const def = imported.default;
          if (!(imported.default instanceof CommandExecutor)) return;

          const cmd: CommandExecutor = imported.default;
          this.cache.set(cmd.name, cmd);

          return cmd;
      });

      const globalCommands = pendingCmds.map(cmd => cmd?.slashCommand) as SlashCommand[];
      
      this.client.interactions.commands.bulkRegister(globalCommands)
      .then(() => Logger.discord.log("Successfully registered", globalCommands.length, "global commands!"))
      .catch(err => Logger.discord.err("Failed to register the global command(s) with error", err.message));
      });
      resolve(this);
    });
  }

  private startListener(prefix: string) {
    this.client.interactions.on("commandInteraction", interaction => {
      const command = interaction.raw.data.name ?? "";
      if (!this.cache.has(command)) return;
      this.cache.get(command)?.execute(this.client, interaction);
    })
  }
}
