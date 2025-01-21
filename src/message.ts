import { Context, Dict, Element, MessageEncoder } from "koishi";
import { WcFerryBot } from "./bot";
import { Config } from "./config";

export class WcFerryMessageEncoder<C extends Context> extends MessageEncoder<C, WcFerryBot<C, Config>> {
  private payload: Dict;

  // 发送缓冲区内的消息
  async flush(): Promise<void> {
    if (this.payload.text) {
      this.payload.text = this.payload.text.trimStart().trimEnd();
      if (this.payload.at) {
        const {data: atUser} = await this.bot.internal.getDBContactInfo(this.payload.at);
        this.payload.text = `@${atUser?.NickName} ${this.payload.text}`;
      }
    }

    if (this.payload.img) {
      await this.bot.internal.sendImage(this.payload.img, this.channelId)
    }

    if (this.payload.file) {
      await this.bot.internal.sendImage(this.payload.file, this.channelId)
    }
  }

  // 遍历消息元素
  async visit(element: Element): Promise<void> {
    const { type, attrs, children } = element;

    if (type === "template") await this.render(children);

    if (type === "br") this.payload.text += "\n";

    if (type === "file" || type === "audio") {
      this.payload.file = attrs.src;
    }

    if (type === "quote") {
      this.payload.at = attrs.name;
    }

    if (type === "img" || type === "image") {
      this.payload.img = attrs.src;
    }

    if (type === 'at') {
      this.payload.at = attrs.id;
    }

    if (type === "p") {
      if (!this.payload.text.endsWith("\n")) this.payload.text += "\n";
      await this.render(children);
      if (!this.payload.text.endsWith("\n")) this.payload.text += "\n";
    }

    if (type === "text") {
      this.payload.text += attrs.content;
    } else if (type === "message") {
      await this.flush();
      await this.render(children);
      await this.flush();
    }
  }
}
