import { Quester } from "koishi";

/**
 * 消息回调格式
 */
export interface MessageCallback {
  /**
   * 消息 ID
   */
  id: number;
  /**
   * 时间戳
   */
  ts: number;
  /**
   * 消息类型
   */
  type: number;
  /**
   * 消息 xml 部分
   */
  xml: string;
  /**
   * 群 ID（仅群消息有）
   */
  roomid: string;
  /**
   * 消息内容
   */
  content: string;
  /**
   * 视频或图片消息的缩略图路径
   */
  thumb: string;
  /**
   * 消息发送人
   */
  sender: string;
  /**
   * 视频或图片消息的路径
   */
  extra: string;
  /**
   * Sign
   */
  sign: number;
  /**
   * 是否被 @：群消息，在 @ 名单里，并且不是 @ 所有人
   */
  is_at: Boolean;
  /**
   * 是否自己发送的
   */
  is_self: Boolean;
  /**
   * 是否群消息
   */
  is_group: Boolean;
}

/**
 * 通用请求结构
 */
export interface RequestBody {
  id?: number;
  /**
   * 群 ID
   */
  roomid?: string;
  /**
   * wxid
   */
  wxid?: string;
  /**
   * wxid，多个用逗号分隔
   */
  wxids?: string;
  /**
   * 要发送的消息，换行使用 \n
   */
  msg?: string;
  /**
   * 消息接收人，wxid 或者 roomid
   */
  receiver?: string;
  /**
   * 要 @ 的 wxid，多个用逗号分隔；@所有人 只需要 notify@all
   */
  aters?: string;
  /**
   * 路径
   */
  path?: string;
  /**
   * 卡片消息：左下显示的名字
   */
  name?: string;
  /**
   * 卡片消息：公众号 id 可以显示对应的头像（gh_ 开头的）
   */
  account?: string;
  /**
   * 卡片消息：标题，最多两行
   */
  title?: string;
  /**
   * 卡片消息：摘要，三行
   */
  digest?: string;
  /**
   * 卡片消息：点击后跳转的链接
   */
  url?: string;
  /**
   * 卡片消息：缩略图的链接
   */
  thumburl?: string;
  /**
   * 数据库名
   */
  db?: string;
  /**
   * 要执行的 SQL
   */
  sql?: string;
  /**
   * 扩展信息
   */
  extra?: string;
  /**
   * 超时时间
   */
  timeout?: number;
  /**
   * 加密用户名 (好友申请消息里 v3 开头的字符串)
   */
  v3?: string;
  /**
   * Ticket (好友申请消息里 v4 开头的字符串)
   */
  v4?: string;
  /**
   * 申请方式 (好友申请消息里的 scene)
   */
  scene?: number;
  /**
   * 转账消息里的 transferid
   */
  transferid?: string;
  /**
   * 转账消息里的 transactionid
   */
  transactionid?: string;
  src?: string;
  dst?: string;
  thumb?: string;
  dir?: string;
}
/**
 * 通用返回结构
 */
export interface ResponseBody {
  status: number;
  message: string;
  data?: {
    /**
     * 是否登录
     */
    login?: Boolean;
    /**
     * 登录账号 wxid
     */
    wxid?: string;
    /**
     * 登录账号昵称
     */
    name?: string;
    /**
     * 登录账号手机号
     */
    mobile?: string;
    /**
     * 登录账号用户数据文件夹
     */
    home?: string;
    /**
     * 消息数据类型
     */
    types?: any;
    /**
     * 好友列表
     */
    friends?: Array<Contacts>;
    /**
     * 联系人信息
     */
    contacts?: Array<Contacts>;
    /**
     * 所有数据库
     */
    dbs?: Array<string>;
    /**
     * db 下的所有表名及对应建表语句
     */
    tables?: Array<Tables>;
    /**
     * 群成员列表 wxid : 昵称
     */
    members?: any;
    /**
     * 用户名片昵称
     */
    alias?: string;
    /**
     * 文件保存路径
     */
    path?: string;
    /**
     * 登录账号个人信息
     */
    ui?: Ui;
  };
}

export declare class Internal {
  http: Quester;
  constructor(http: Quester);
  static define(name: string, method: string, path: string): void;
}

/**
 * 联系人信息
 */
export interface Contacts {
  /**
   * 联系人 wxid
   */
  wxid: string;
  /**
   * 联系人自定义微信号
   */
  code: string;
  /**
   * 联系人备注
   */
  remark: string;
  /**
   * 联系人昵称
   */
  name: string;
  /**
   * 联系人国家代码
   */
  country: string;
  /**
   * 联系人省份代码
   */
  province: string;
  /**
   * 联系人城市代码
   */
  city: string;
  /**
   * 联系人性别：男 | 女 |
   */
  gender: string;
}

/**
 * 表名及对应建表语句
 */
export interface Tables {
  /**
   * 表名
   */
  name: string;
  /**
   * 建表语句
   */
  sql: string;
}

/**
 * 登录账号个人信息
 */
export interface Ui {
  /**
   * 联系人 wxid
   */
  wxid: string;
  /**
   * 联系人昵称
   */
  name: string;
  /**
   * 登录账号手机号
   */
  mobile: string;
  /**
   * 微信文件路径
   */
  home: string;
}

/**
 * 数据库用户信息
 */
export interface DBContactInfo {
  /**
   * 验证标志
   */
  VerifyFlag: number;
  /**
   * 加密用户名
   */
  EncryptUserName: string;
  /**
   * 备注拼音首字母
   */
  RemarkPYInitial: string;
  /**
   * 保留字段
   */
  Reserved4: any | null;
  /**
   * 昵称
   */
  NickName: string;
  /**
   * 保留字段
   */
  Reserved7: any | null;
  /**
   * 聊天室类型
   */
  ChatRoomType: number;
  /**
   * 保留字段
   */
  Reserved10: any | null;
  /**
   * 保留字段
   */
  Reserved9: any | null;
  /**
   * 保留字段
   */
  Reserved3: any | null;
  /**
   * 删除标志
   */
  DelFlag: number;
  /**
   * 备注
   */
  Remark: string;
  /**
   * 小头像图片 URL
   */
  SmallHeadImgUrl: string;
  /**
   * 额外信息
   */
  ExtraBuf: string;
  /**
   * 保留字段
   */
  Reserved8: any | null;
  /**
   * 保留字段
   */
  Reserved1: number;
  /**
   * 标签 ID 列表
   */
  LabelIDList: string;
  /**
   * 保留字段
   */
  Reserved6: string;
  /**
   * 头像 MD5
   */
  HeadImgMd5: string;
  /**
   * 拼音首字母
   */
  PYInitial: string;
  /**
   * 大头像图片 URL
   */
  BigHeadImgUrl: string;
  /**
   * 备注全拼
   */
  RemarkQuanPin: string;
  /**
   * 类型
   */
  Type: number;
  /**
   * 域名列表
   */
  DomainList: string;
  /**
   * 保留字段
   */
  Reserved5: number;
  /**
   * 全拼
   */
  QuanPin: string;
  /**
   * 用户名
   */
  UserName: string;
  /**
   * 保留字段
   */
  Reserved2: number;
  /**
   * 保留字段
   */
  Reserved11: any | null;
  /**
   * 别名
   */
  Alias: string;
  /**
   * 聊天室通知
   */
  ChatRoomNotify: number;
}

export enum MessageType {
  SYSNOTICE = 9999, // SYSNOTICE
  INIT = 51, // 微信初始化
  RED_PACKET = 10000, // 红包、系统消息
  VIDEO = 43, // 视频
  TEXT = 1, // 文字
  LOCATION = 48, // 位置
  IMAGE = 3, // 图片
  SHAKE = 922746929, // 拍一拍
  LINK = 16777265, // 链接
  VIDEO_LIVE = 973078577, // 视频号直播
  SMALL_VIDEO = 62, // 小视频
  CARD = 42, // 名片
  ROCK_PAPER_SCISSORS = 47, // 石头剪刀布 | 表情图片
  VIDEO_LIVE2 = 975175729, // 视频号直播
  VOIP_NOTIFY = 52, // VOIPNOTIFY
  SOGOU_EMOTICON = 1048625, // 搜狗表情
  CIRCLE = 0, // 朋友圈消息
  MUSIC_LINK = 1040187441, // 音乐链接
  VOICE = 34, // 语音
  RED_PACKET2 = 436207665, // 微信红包
  VIDEO_CARD = 771751985, // 视频号名片
  QUOTE = 822083633, // 引用消息
  VOIP_MSG = 50, // VOIPMSG
  VOIP_INVITE = 53, // VOIPINVITE
  SHARE = 49, // 共享实时位置、文件、转账、链接
  POSSIBLEFRIEND_MSG = 40, // POSSIBLEFRIEND_MSG
  RECALL = 10002, // 撤回消息
  GOODS_LINK = 974127153, // 商品链接
  RED_PACKET_COVER = 536936497, // 红包封面
  FILE = 1090519089, // 文件
  FRIEND_CONFIRM = 37, // 好友确认
  VIDEO_SHORT = 754974769, // 视频号视频
  RED_PACKET3 = 66 // 微信红包
}

/**
 * 数据库会话信息
 */
export interface DBSessionInfo {
  /**
   * 其他提及我
   */
  othersAtMe: number;
  /**
   * 保留字段
   */
  Reserved0: number;
  /**
   * 本地消息 ID
   */
  nMsgLocalID: number;
  /**
   * 保留字段
   */
  Reserved2: number;
  /**
   * 消息时间
   */
  nTime: number;
  /**
   * 消息内容
   */
  strContent: string;
  /**
   * 用户名
   */
  strUsrName: string;
  /**
   * 昵称
   */
  strNickName: string;
  /**
   * 消息顺序
   */
  nOrder: number;
  /**
   * 消息状态
   */
  nMsgStatus: number;
  /**
   * 未读消息计数
   */
  nUnReadCount: number;
  /**
   * 编辑内容
   */
  editContent: string;
  /**
   * 消息类型
   */
  nMsgType: number;
  /**
   * 保留字段
   */
  Reserved3: any | null;
  /**
   * XML 字节
   */
  bytesXml: any | null;
  /**
   * 保留字段
   */
  Reserved5: any | null;
  /**
   * 保留字段
   */
  Reserved4: number;
  /**
   * 是否发送
   */
  nIsSend: number;
  /**
   * 状态
   */
  nStatus: number;
  /**
   * 父引用
   */
  parentRef: any | null;
  /**
   * 保留字段
   */
  Reserved1: any | null;
}
