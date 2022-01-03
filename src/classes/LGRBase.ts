import chalk from "chalk";
import { MethodConfig } from "@lvksh/logger";

export const Logger = {};

export const LGRBase: {
  [k: string]: string | MethodConfig;
} = {
    info: chalk.cyan("INFO"),
    warn: chalk.keyword("orange")("WARN"),
    error: chalk.keyword("tomato")("ERROR"),
    auth: chalk.green("AUTH"),
};
