import type {FastifyInstance} from "fastify";
import {socketHandler} from "./ws.controller.js";

async function wsRoutes(fastify: FastifyInstance) {
  fastify.get('/', {
    websocket: true,
    preValidation: [fastify.verifyApiKey]
  }, socketHandler)
}

export default wsRoutes