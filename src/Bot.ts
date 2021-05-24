import { BaseBot } from "./Base";
import Discord, { Intents } from 'discord.js';
import { Logger } from "./classes/Logger";
import { Commands } from "./classes/Commands";
import cfg from "../.config";

export class DuxcoreBot extends BaseBot {

  public cfg = cfg;

  public bot: Discord.Client = new Discord.Client();
  public commands: Commands = new Commands(this, cfg.commands.prefix);
  
  private _botToken: string;
  private _startTime?: Date;

  constructor(botToken: string) {
    super();
    this._botToken = botToken;
  }

  get uptime() {
    const current = Date.now();
    const started = this._startTime?.getDate() ?? current;

    return ( current - started );
  }

  start(): Promise<DuxcoreBot> {
    return new Promise(async (resolve, reject) => {
      await this.commands.register(`${__dirname}/commands`);

      this.bot.login(this._botToken).then(() => {
        resolve(this);
        this.emit('ready', this);
        Logger.discord.auth("Successfully logged into discord as", this.bot.user?.tag);
      }).catch(err => {
        Logger.discord.err("Failed to authenticate with discord:", err.toString());
      });
    })
  }

}