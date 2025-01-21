import { Quester, Schema } from "koishi"

  export type Config = {
    path: string
    consoleLog: boolean
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      path: Schema.string().description("wcferry 通知监听路径").default('/wechatFerry'),
      consoleLog: Schema.boolean().description("是否在控制台输出接收信息日志").default(false),
    }),
    Quester.createConfig("http://127.0.0.1:10010")
  ])
