import type {FastifyReply, FastifyRequest} from "fastify";

export async function pingHandler(request: FastifyRequest, reply: FastifyReply) {
  const clients = new Set()

  try {

    reply.raw.setHeader('Content-Type', 'text/event-stream')
    reply.raw.setHeader('Cache-Control', 'no-cache')
    reply.raw.setHeader('Connection', 'keep-alive')
    reply.raw.flushHeaders()

    clients.add(reply.raw)

    // keep alive
    const timerId = setInterval(() => {
      reply.raw.write(`: ping ${new Date(Date.now()).toUTCString()}\n\n`)
    }, 1000*3)

    request.raw.on('close', () => {
      clearInterval(timerId)
      clients.delete(reply.raw)
    })

  } catch (error) {
    request.log.error(error)
    reply.code(500).send({message: "Something went wrong"})
  }
}
