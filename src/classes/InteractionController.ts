import { DuxcoreBot } from "../Bot";
import axios from 'axios';
import { Collection, Guild, GuildMember, MessageEmbed } from "discord.js";
import { InteractionMessageResolvable, InteractionReplyOpts, InteractionResponse, MessageFlags, OptionsEntity, RawInteractionObject } from "../util/types/interactions";
import { discordApiUrl } from "../util/constraints";

export class InteractionController {
  private _client: DuxcoreBot;
  private _raw: RawInteractionObject;

  constructor(raw: RawInteractionObject, client: DuxcoreBot) {
    this._client = client;
    this._raw = raw;
  }

  get id(): string { return this._raw.id; }
  get type(): number { return this._raw.type; }
  get token(): string { return this._raw.token; }
  
  get raw(): RawInteractionObject { return this._raw; }
  get rawOptions(): OptionsEntity[] { return this._raw.data.options ?? [] }

  get guild(): Guild | null { return this._client.bot.guilds.cache.get(this._client.cfg.guild) ?? null; }
  get member(): GuildMember | null {
    const memberId = this._raw.member.user.id;

    const guild = this._client.bot.guilds.cache.get(this._client.cfg.guild);
    const member = guild?.members.cache.get(memberId);

    if (!member) return null;

    return member;
  }

  get options(): Collection<string, OptionsEntity> {
    const rawOptions = this.rawOptions;
    const options = new Collection<string, OptionsEntity>();

    rawOptions.map(opt => options.set(opt.name, opt));

    return options;
  }

  public async reply(message: InteractionMessageResolvable, options?: InteractionReplyOpts) {
    const useTTS = options?.tts ?? false;
    const isPrivate = options?.private ?? true;
    const replyUser = options?.replyUser ?? true;

    const content = (() => {
      if ((typeof message) == 'string') return message as string;
      if ((typeof message) == 'object' && message instanceof Array) {
        const strings = message.map(val => {if (typeof val == 'string') return val});
        return strings.join(" ");
      }
      return ""
    })();

    const embeds = (() => {
      if (message instanceof MessageEmbed) return [ message ] as MessageEmbed[];
      if (message instanceof Array) {
        const embeds = message.map(val => { if (val instanceof MessageEmbed) return val; });
        return embeds as MessageEmbed[];
      }
      return []
    })()

    let responseObject: InteractionResponse = {
      type: 4,
      data: {
        content: content,
        allowed_mentions: {
          parse: ["everyone", "roles", "users"],
          replied_user: replyUser
        },
        embeds: embeds,
        tts: useTTS
      }
    }

    if (isPrivate) responseObject.data.flags = MessageFlags.EPHEMERAL;

    return await this.respond(responseObject);
  }

  public respond(response: InteractionResponse): Promise<void> {
    return new Promise(async (resolve, reject) => {
      axios.post(`${discordApiUrl}interactions/${this.id}/${this.token}/callback`, response)
           .then(res => resolve())
           .catch(err => reject(err));
    });
  }


}