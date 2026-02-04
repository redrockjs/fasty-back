import fp from 'fastify-plugin'
import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify'

async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
      try {
        await request.jwtVerify()
      } catch (err) {
        reply.code(401).send({
          message: 'Unauthorized'
        })
      }
    }
  )
}

export default fp(authPlugin)