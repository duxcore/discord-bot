import { Collection } from "discord.js";
import { glob } from "glob";
import { DuxcoreBot } from "../Bot";
import CommandExecutor from "../structures/CommandExecutor";

export class Commands {

  public client: DuxcoreBot;
  public cache: Collection<string, CommandExecutor> = new Collection();

  constructor(client: DuxcoreBot, prefix: string) {
    this.client = client;

    this.startListener(prefix);
  }

  register(dir: string): Promise<Commands> {
    return new Promise((resolve, reject) => {
      const ext = (__filename.endsWith("ts") ? "ts" : "js");
      glob(`${dir}/**/cmd.*.${ext}`, (err, files) => {
        files.map(f => {
          const imported = require(f);
          const def = imported.default;
          if (!(imported.default instanceof CommandExecutor)) return;

          const cmd: CommandExecutor = imported.default;
          this.cache.set(cmd.name, cmd);
        });
      });
      resolve(this);
    });
  }

  private startListener(prefix: string) {
    this.client.bot.on("message", msg => {
      if (!msg.content.startsWith(prefix)) return;

      const command = msg.content.slice(prefix.length).trim().split(" ")[0];
      if (!this.cache.has(command)) return;

      this.cache.get(command)?.execute(msg);
    })
  }

}