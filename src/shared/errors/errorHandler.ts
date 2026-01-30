import {errorCodes} from "fastify";

import type {
  FastifyReply,
  FastifyRequest,
  FastifyError,
} from "fastify"

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof errorCodes.FST_ERR_NOT_FOUND) {
    return reply.status(404).send({message: `${request.params} not found`});
  }

  return reply.status(500).send({message: "Something went wrong"});
};

export const serverHttpErrorSchema = {
  type: "object",
  properties: {
    message: {type: "string"}
  }
}

export const clientHttpErrorSchema = {
  type: 'object',
  properties: {
    message: {type: 'string'},
  }
}

export const clientHTTPAcceptSchema = {

}