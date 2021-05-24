import chalk from "chalk";
import moment from "moment";

export class LGRBase {

  private cmdInterface: string;

  constructor(cmdInterface?: string) {
    const defaultCmdInterface: string = chalk.yellow("[Server]");
    this.cmdInterface = cmdInterface ?? defaultCmdInterface;
  }

  /**
   * LOGGER PREFIXES
   */
  private prefix = {
    info: chalk.cyan('INFO'),
    warn: chalk.keyword("orange")("WARN"),
    error: chalk.keyword("tomato")("ERROR"),
    auth: chalk.green("AUTH"),
  }  

  /**
   * METHOD ALIASES
   */
   public err = this.error;
   public info = this.log;

  /**
   * MAIN METHODS
   */
  private assembleMessage(type: string, message: string) {
    const prefix = this.prefix[type] ?? this.prefix.info;
    const newMsg = [
      chalk.grey(moment().format('DD.MM HH:mm:ss')),
      this.cmdInterface,
      prefix,
      message
    ];

    return newMsg.join(' ');
  }

   log(...args: any[]): void {
     console.log(this.assembleMessage('info', args.join(' ')));
     return;
   }

   warn(...args): void {
    console.log(this.assembleMessage('warn', args.join(' ')));
    return;
   }

   error(...args): void {
    console.log(this.assembleMessage('error', args.join(' ')));
    return;
   }

   auth(...args): void {
    console.log(this.assembleMessage('auth', args.join(' ')));
    return;
   }
}