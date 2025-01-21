import { Login, SendOptions } from "@satorijs/protocol";
import { Bot, Context, Fragment, Quester } from "koishi";
import { WcFerryMessageEncoder } from "./message";
import { Internal } from "./internal";
import { Config } from "./config";
import { HttpServer } from "./http-server";

export class WcFerryBot<C extends Context, T extends Config> extends Bot<C, T>{
  static MessageEncoder: typeof WcFerryMessageEncoder = WcFerryMessageEncoder
  static inject:  string[]

  http: Quester
  internal: Internal

  constructor(ctx: C, config: T) {
    super(ctx, config)
    this.platform = "wechat"
    this.logger = ctx.logger('wcferry')
    this.http = ctx.http.extend({headers: {"Content-Type": "application/json"}}).extend(config)
    this.internal = new Internal(this.http)
    ctx.plugin(HttpServer)
  }

  async getLogin(): Promise<Login> {
      const myInfo = await this.internal.myUserinfo()
      this.user = {
        id: myInfo.data.wxid,
        name: myInfo.data.name,
        nick: myInfo.data.name,
        avatar: myInfo.data.small_head_url,
        isBot: true
      }
      this.selfId = myInfo.data.wxid

      return this.toJSON();
  }

  async handleFriendRequest(messageId: string, approve: boolean, comment?: string): Promise<void> {
    const [scene, v3,v4,_] = messageId.split('|')
    if (!approve) {
      this.logger.info("拒绝好友请求", messageId)
      return
    }
    const res = await this.internal.acceptNewFriend(Number(scene), v3, v4)
    this.logger.info("接受好友请求", res)
  }
}

