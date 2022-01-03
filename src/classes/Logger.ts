import { createLogger } from "@lvksh/logger";
import chalk from "chalk";
import { LGRBase } from "./LGRBase";

const all = createLogger({
  base: chalk.yellow("[Server]"),
  discord: chalk.hex("#7289DA")("[Discord]")
});

export class Logger {
  public static base = createLogger(LGRBase, {}, all.base);
  public static discord = createLogger(LGRBase, {}, all.discord);
}