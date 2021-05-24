import { Collection, MessageEmbed } from "discord.js";
import { glob } from "glob";
import { DuxcoreBot } from "../Bot";
import { EmbedObject } from "../util/types/embedFile";

export class EmbedManager {
  public client: DuxcoreBot;
  public cache: Collection<string, EmbedObject> = new Collection();

  constructor(client: DuxcoreBot) {
    this.client = client;
  }

  get(name: string, vals?: Object): MessageEmbed | string {
    const exists = this.cache.has(name);

    if (exists) return this.cache.get(name)?.getEmbed(vals) ?? "Embed Not Found";
    return "Embed Not Found";
  }

  register(dir: string): Promise<EmbedManager> {
    return new Promise((resolve, reject) => {
      const ext = (__filename.endsWith("ts") ? "ts" : "js");
      glob(`${dir}/**/embed.*.${ext}`, (err, files) => {
        files.map(f => {
          const imported = require(f);
          const def = imported.embedObj;

          const embed: EmbedObject = imported.embedObj;
          this.cache.set(embed.name, embed);
        });
      });
      resolve(this);
    });
  }
}