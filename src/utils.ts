import { Context, h } from "koishi";
import { WcFerryBot } from "./bot";
import { Config } from "./config";
import { MessageCallback, MessageType } from "./types";
import * as xml2js from 'xml2js'
export * from "./types";

export async function adaptSession<C extends Context>(bot: WcFerryBot<C, Config>, body: MessageCallback): Promise<C[typeof Context.session]> {
  const session = bot.session()

  session.messageId = body.id.toString()
  session.timestamp = body.ts

  session.userId = body.sender
  const {data: senderContact} = await bot.internal.getDBContactInfo(body.sender)
  session.username = senderContact?.NickName
  session.user.$merge(senderContact)

  session.subtype = body.is_group ? "group" : "private"

  if (body.is_group) {
    session.channelId = body.roomid
    const chanelContact = await bot.internal.getDBContactInfo(body.roomid)
    session.channel.$merge(chanelContact)
  } else {
    session.channelId = `private:${body.sender}`
  }

  if (body.type === MessageType.TEXT) {
    session.type = "message"
    session.isDirect = true
    session.elements = [h.text(body.content)]
  } else if (body.type === MessageType.IMAGE) {
    session.type = "image"
    session.isDirect = true
    session.elements = [h.image(body.content)] // 图片消息格式不明，未处理
  } else if (body.type === MessageType.LOCATION) {
    session.isDirect = true;
    session.type = "location";
    let {
      msg: {
        location: { $: locationData }
      }
    } = await xml2js.parseStringPromise(body.content, {explicitArray:false})

    session.elements = [h('location', { latitude: locationData.x,
      longitude: locationData.y,
      label: locationData.label})]
  } else if (body.type === MessageType.FRIEND_CONFIRM) {
    session.isDirect = true
    session.type = "friend-request"
    session.event.type="friend-request"
    session.event.timestamp = body.ts;
    session.event.selfId = bot.selfId

    const wxid = body.content.match(/fromusername="([^"]*)"/)[1]
    const v3 = body.content.match(/encryptusername="([^"]*)"/)[1]
    const v4 = body.content.match(/ticket="([^"]*)"/)[1]
    const msg = body.content.match(/content="([^"]*)"/)[1]
    const scene = body.content.match(/scene="([^"]*)"/)[1]
    const nickname = body.content.match(/fromnickname="([^"]*)"/)[1]

    session.event.argv = {
        name: 'friend-request',
        arguments: [wxid, v3, v4, msg, scene, nickname],
        options: {wxid, v3, v4, msg, scene, nickname}
    }

    session.userId = wxid
    session.username = nickname
    session.channelId = wxid
    session.messageId = `${scene}|${v3}|${v4}|${msg}`
  }

  return session
}
