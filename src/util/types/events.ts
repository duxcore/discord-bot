import { DuxcoreBot } from "../../Bot";

export interface BotEvents {
  'ready': (client: DuxcoreBot) => void;
}