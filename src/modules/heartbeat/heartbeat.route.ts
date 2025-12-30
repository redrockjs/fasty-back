import type {FastifyInstance} from "fastify";
import {heartbeatSchema} from "./heartbeat.schema.js";
import {heartbeatHandler} from "./heartbeat.controller.js";

async function heartbeatRoutes(fastify: FastifyInstance) {
  fastify.get('/', heartbeatSchema, heartbeatHandler)
}

export default heartbeatRoutes;