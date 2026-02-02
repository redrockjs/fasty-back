import {type FastifyInstance} from 'fastify'

export async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate(
    'authenticate',
    async (request: any, reply: any) => {
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