import { DuxcoreBot } from './src/Bot';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN ?? "";
const app = new DuxcoreBot(token);

app.start();

const events = ["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"]

events.forEach(event => {
  process.on(event, (e) => app.stop(e))
})
