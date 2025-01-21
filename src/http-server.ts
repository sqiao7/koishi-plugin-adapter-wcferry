import { Adapter, Context, Logger } from "koishi";
import { WcFerryBot } from "./bot";
import { Config } from "./config";
import { adaptSession } from "./utils";

export class HttpServer<C extends Context> extends Adapter<C, WcFerryBot<C, Config>> {
  static inject: string[] = ['server']

  private logger: Logger

  constructor(ctx: C, bot: WcFerryBot<C, Config>) {
    super(ctx)
    this.logger = ctx.logger('wcferry-http')

    const {path, consoleLog} = bot.config

    ctx.server.post(path, async (sctx) => {
      const {body} = sctx.request

      if (consoleLog) this.logger.info(body)

      sctx.status = 200;

      if (body.is_self) {
        sctx.body = { isSelf: true };
        return;
      }

      const b = this.bots && this.bots[0];
      if (!b) return;

      const session = await adaptSession(b, body)

      if (consoleLog) this.logger.info(session)

      b.dispatch(session)
    })

  }

  async connect(bot: WcFerryBot<C, Config>): Promise<void> {
      await bot.getLogin()
      bot.online()
  }

  async disconnect(bot: WcFerryBot<C, Config>): Promise<void> {
      bot.offline()
  }
}
