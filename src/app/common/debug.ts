import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RXJSLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

let rxjsLoggingLevel = RXJSLoggingLevel.INFO;

export function setRxjsLogginglevel(level: RXJSLoggingLevel) {
  rxjsLoggingLevel = level;
}

export const debug = (level: number, message: string) =>
  (source: Observable<any>) => source.pipe(
    tap(val => {
      if (level >= rxjsLoggingLevel) {
        console.log(message + ': ', val);
      }
    })
  );