import { BaseBot } from "./Base";
import Discord, { Intents } from 'discord.js';
import { Logger } from "./classes/Logger";
import { Commands } from "./classes/Commands";
import RoleManager from "./structures/RoleManager";
import cfg from "../.config";
import { EmbedManager } from "./Managers/EmbedManager";
import InteractiveClient from "@duxcore/interactive-discord";

export class DuxcoreBot extends BaseBot {

  public cfg = cfg;

  public bot: Discord.Client = new Discord.Client();
  public interactions = new InteractiveClient(this.bot);
  public commands: Commands = new Commands(this, cfg.commands.prefix);
  public embeds: EmbedManager = new EmbedManager(this);
  public roleManager: RoleManager = new RoleManager(this);
  
  private _botToken: string;
  private _startTime?: Date;

  constructor(botToken: string) {
    super();
    this._botToken = botToken;
  }

  get uptime() {
    const current = Date.now();
    const started = this._startTime?.getTime() ?? current;

    return ( current - started );
  }

  start(): Promise<DuxcoreBot> {
    return new Promise(async (resolve, reject) => {
      await this.embeds.register(`${__dirname}/embeds`);

      this.bot.login(this._botToken).then(async() => {
        await this.commands.register(`${__dirname}/commands`);
        this._startTime = new Date();
        resolve(this);
        this.emit('ready', this);
        Logger.discord.auth("Successfully logged into discord as", this.bot.user?.tag);
      }).catch(err => {
        Logger.discord.err("Failed to authenticate with discord:", err.toString());
      });

      this.bot.on('ready', () => {
        this.roleManager.start()
      })
    })
  }

  stop(event: string) {
    this.bot.destroy()
    Logger.base.info(`Stopped bot with event '${event}'`);
    ///throw event;
  }
}
