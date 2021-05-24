import chalk from "chalk";
import { LGRBase } from "./LGRBase";


export class Logger {
  public static base = new LGRBase();
  public static discord = new LGRBase(chalk.hex("#7289DA")("[Discord]"));
}