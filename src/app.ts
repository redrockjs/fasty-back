import Fastify from 'fastify'
import dotenv from 'dotenv';


dotenv.config();
const APP_PORT = Number(process.env.APP_PORT);

const app = Fastify({
  logger: true
})

app.get('/', function (request, reply) {
  reply.send({hello: 'world'})
})


app.listen({port: APP_PORT}, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})