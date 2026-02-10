import type {FastifyInstance} from "fastify";
import {pingHandler} from "./events.controller.js";

async function eventsRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', {}, pingHandler)
}

export default eventsRoutes;