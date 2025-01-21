import { WcFerryBot } from "./bot";
import * as WcFerry from './utils'

export * from './bot'
export * from './utils'
export * from './message'
export * from './http-server'
export * from './config'

export const name = 'adapter-wcferry'
export default WcFerryBot

declare module 'koishi' {
  interface Context {
    server: any
  }
}
declare module "@satorijs/core" {
  interface Session {
    wechatFerry?: WcFerry.RequestBody & WcFerry.Internal;
  }
}
