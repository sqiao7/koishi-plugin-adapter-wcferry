import { Quester } from "koishi";
import { DBContactInfo, DBSessionInfo } from "./types";

export class Internal {
  constructor(private http: Quester) {}

  private async request(
    method: Quester.Method,
    path: string,
    data?: any,
    headers?: any
  ) {
    if (method === "GET") {
      return (await this.http(path, { params: data, headers })).data;
    } else {
      return (
        await this.http(method, path, { data: JSON.stringify(data), headers })
      ).data;
    }
  }

  /**
   * 接受好友请求
   */
  async acceptNewFriend(scene: number, v3: string, v4: string) {
    return await this.request("POST", "/accept-new-friend", { scene, v3, v4 });
  }

  /**
   * 查询群成员
   */
  async queryRoomMembers(room_id: string) {
    return await this.request("GET", "/query-room-member", { room_id });
  }

  /**
   * 添加群成员
   */
  async addChatroomMember(roomid: string, wxids: string) {
    return await this.request("POST", "/add-chatroom-member", {
      roomid,
      wxids,
    });
  }

  /**
   * 删除群成员
   */
  async deleteChatroomMember(roomid: string, wxids: string) {
    return await this.request("POST", "/delete-chatroom-member", {
      roomid,
      wxids,
    });
  }

  /**
   * 邀请群成员
   */
  async inviteChatroomMember(roomid: string, wxids: string) {
    return await this.request("POST", "/invite-chatroom-member", {
      roomid,
      wxids,
    });
  }

  /**
   * 保存语音
   */
  async saveAudio(dir: string, id: number) {
    return await this.request("POST", "/audio", { dir, id });
  }

  /**
   * 查询所有联系人，包括服务号、公众号、群聊等
   */
  async getAllContacts() {
    return await this.request("GET", "/contacts");
  }

  /**
   * 获取所有可查询数据库
   */
  async queryAllDatabase() {
    return await this.request("GET", "/dbs");
  }

  /**
   * 发送文件
   */
  async sendFile(path: string, receiver: string) {
    return await this.request("POST", "/file", { path, receiver });
  }

  /**
   * 转发消息
   */
  async forwardMessage(id: string, receiver: string) {
    return await this.request("POST", "/forward-msg", { id, receiver });
  }

  /**
   * 发送图片
   */
  async sendImage(path: string, receiver: string) {
    return await this.request("POST", "/image", { path, receiver });
  }

  /**
   * 发送文本
   */
  async sendText(aters: string, msg: string, receiver: string) {
    return await this.request("POST", "/text", { aters, msg, receiver });
  }

  /**
   * 获取登录状态
   */
  async isLogin() {
    return await this.request("GET", "/islogin");
  }

  /**
   * 获取消息类型枚举
   */
  async msgTypes() {
    return await this.request("GET", "/msg-types");
  }

  /**
   * 发送拍一拍消息
   */
  async pat(roomid: string, wxid: string) {
    return await this.request("POST", "/msg-types", { roomid, wxid });
  }

  /**
   * 接收转账
   */
  async receiveTransfer(taid: string, tfid: string, wxid: string) {
    return await this.request("POST", "/receive-transfer", {
      taid,
      tfid,
      wxid,
    });
  }

  /**
   * 撤回消息
   */
  async revokeMsg(id: string) {
    return await this.request("POST", "/revoke-msg", { id });
  }

  /**
   * /selfwxid
   */
  async sendRichText(
    account: string,
    digest: string,
    name: string,
    receiver: string,
    thumburl: string,
    title: string,
    url: string
  ) {
    return await this.request("POST", "/rich-text", {
      account,
      digest,
      name,
      receiver,
      thumburl,
      title,
      url,
    });
  }

  /**
   * 执行sql
   */
  async execSql(db: string, sql: string) {
    return await this.request("POST", "/sql", { db, sql });
  }

  /**
   * 获取数据库表信息
   */
  async dbTableInfo(db: string) {
    return await this.request("GET", `/${db}/tables`);
  }

  /**
   * 获取自身wxid
   */
  async selfWxid() {
    return await this.request("GET", "/selfwxid");
  }

  /**
   * 获取用户信息
   */
  async myUserinfo() {
    return await this.request("GET", "/userinfo");
  }

  /**
   * 获取数据库用户信息
   */
  async getDBContactInfo(wxid: string) {
    return await this.execSql("MicroMsg.db", `SELECT * FROM User WHERE UserName = '${wxid}'`) as DBContactInfo | null;
  }


  /**
   * 获取数据库用户信息
   */
  async getDBSessionInfo(wxid: string) {
    return await this.execSql("MicroMsg.db", `SELECT * FROM Session WHERE strUsrName = '${wxid}'`) as DBSessionInfo | null;
  }


}
