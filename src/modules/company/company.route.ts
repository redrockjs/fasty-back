import type {FastifyInstance, FastifyReply} from "fastify";
import {getAllCompaniesHandler} from "./company.controller.js";
import {serverError} from "../../shared/errors/errorHandler.js";

async function companyRoutes(fastify: FastifyInstance) {
  /**
   * @Get / (R)
   * List all companies ordered by creation date
   */
  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              data: {type: 'string'}
            }
          },
          500: serverError,
        }
      }
    },
    async (_, reply: FastifyReply) => {

      const data = await getAllCompaniesHandler()

      try {
        reply.code(200).send({data})
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({message: "Something went wrong"});
      }
    }
  )
}

export default companyRoutes;