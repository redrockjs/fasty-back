import {buildApp} from './app.js'


const APP_PORT = Number(process.env.APP_PORT);

const app = buildApp({logger: true})

app.listen({port: APP_PORT}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  console.log(`Server running at ${address}`)
})