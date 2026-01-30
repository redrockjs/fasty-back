import {buildApp} from './app.js'
import {configPinoLogger} from "./shared/config/pino.js";

const options = {
  logger: configPinoLogger
}

const APP_PORT = Number(process.env.APP_PORT);

const app = buildApp(options)

app.listen({port: APP_PORT}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`▁ ▂ ▃ ▄ ▅ ▆ ▇ 🔥 Server running at ${address}`)
})