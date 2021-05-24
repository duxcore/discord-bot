import { BotEvents } from "./util/types/events";
import { TypedEmitter } from 'tiny-typed-emitter';

export class BaseBot extends TypedEmitter<BotEvents> {

  constructor() {
    super();
  }

  randStr(length: number): string {
    let result = '';
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charsLength = chars.length;
  
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    
    return result;
  }
}