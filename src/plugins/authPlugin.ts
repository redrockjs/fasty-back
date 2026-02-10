import fp from 'fastify-plugin'
import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";

async function authPlugin(fastify: FastifyInstance) {

  async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({
        message: 'Unauthorized'
      })
    }
  }

  fastify.decorate("authenticate", authenticate)
}

export default fp(authPlugin)