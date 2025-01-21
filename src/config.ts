import { Quester, Schema } from "koishi"

  export type Config = {
    path: string
    autoAters: boolean
    consoleLog: boolean
  }

  export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
      path: Schema.string().description("wcferry 通知监听路径").default('/wechatFerry'),
      autoAters: Schema.boolean().description("是否自动艾特发出指令的人员(群聊)").default(false),
      consoleLog: Schema.boolean().description("是否在控制台输出接收信息日志").default(false),
    }),
    Quester.createConfig("http://127.0.0.1:10010")
  ])
