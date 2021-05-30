import axios from "axios";
import { Collection } from "discord.js";
import { glob } from "glob";
import { DuxcoreBot } from "../Bot";
import CommandExecutor from "../structures/CommandExecutor";
import { Logger } from "../classes/Logger";

export class Commands {

  public client: DuxcoreBot;
  public cache: Collection<string, CommandExecutor> = new Collection();

  constructor(client: DuxcoreBot, prefix: string) {
    this.client = client;

    this.startListener(prefix);
  }

  register(dir: string): Promise<Commands> {
    return new Promise(async (resolve, reject) => {
      const res = await axios.get(`https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${this.client.cfg.guild}/commands`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`
        }
      })
      const commands: string[] = res.data.map(cmd => cmd.name)

      const ext = (__filename.endsWith("ts") ? "ts" : "js");
      glob(`${dir}/**/cmd.*.${ext}`, (err, files) => {
        files.map(f => {
          const imported = require(f);
          const def = imported.default;
          if (!(imported.default instanceof CommandExecutor)) return;

          const cmd: CommandExecutor = imported.default;
          this.cache.set(cmd.name, cmd);
          if (!commands.includes(cmd.name)) axios.post(`https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${this.client.cfg.guild}/commands`, {
            name: cmd.name,
            description: cmd.desciption,
            options: cmd.args
          }, {
            headers: {
              Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
          }).then(() => {
            Logger.discord.log(`Created command '${cmd.name}'`)
          }).catch(err => {
            Logger.discord.err(`Failed to create command ${cmd.name}`, err.toString())
          })
          else commands.splice(commands.indexOf(cmd.name), 1)
        });
        for (let i = 0; i < commands.length; i++) {
          const command = commands[i];
          axios.delete(`https://discord.com/api/v8/applications/${process.env.APPLICATION_ID}/guilds/${this.client.cfg.guild}/commands/${res.data.find(cmd => cmd.name === command).id}`, {
            headers: {
              Authorization: `Bot ${process.env.BOT_TOKEN}`
            }
          }).then(() => {
            Logger.discord.log(`Deleted command '${command}'`)
          }).catch(err => {
            Logger.discord.log(`Failed to delete command '${command}'`, err.toString())
          })
        }
      });

      resolve(this);
    });
  }

  private startListener(prefix: string) {
    // @ts-ignore
    this.client.bot.ws.on('INTERACTION_CREATE', (interaction) => {
      const command = interaction.data.name

      if (!this.cache.has(command)) return;

      this.cache.get(command)?.execute(this.client, interaction)
    })
  }
}
