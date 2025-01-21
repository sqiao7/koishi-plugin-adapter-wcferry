import { Dict, Element, MessageEncoder } from "koishi";

export class WcFerryMessageEncoder extends MessageEncoder {
  private payload: Dict;

  // 发送缓冲区内的消息
  async flush(): Promise<void> {
    if (this.payload.text) {
      this.payload.text = this.payload.text.trimStart().trimEnd();
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
