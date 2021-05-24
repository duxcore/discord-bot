import { DuxcoreBot } from './src/Bot';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN ?? "";
const app = new DuxcoreBot(token);

app.start();