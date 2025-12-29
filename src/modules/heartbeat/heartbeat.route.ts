import type {FastifyInstance, FastifyReply} from "fastify";
import {serverError} from "../../shared/errors/errorHandler.js";

async function heartbeatRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          },
          500: serverError,
        }
      }
    },
    async (_, reply: FastifyReply) => {
      try {
        reply.code(200).send({message: 'Heartbeat is OK!'})
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ message: "Something went wrong" });
      }
    })
}

export default heartbeatRoutes;