import type {FastifyInstance} from "fastify";
import {
  allPositionsSchema,
  singlePositionSchema,
  createPositionSchema,
  deletePositionSchema,
  updatePositionSchema
} from "./position.schema.js";
import {
  getAllPositionsHandler,
  getPositionByIdHandler,
  createPositionHandler,
  deletePositionHandler,
  updatePositionHandler,
} from "./position.controller.js";

async function positionRoutes(fastify: FastifyInstance) {
  fastify.get('/', allPositionsSchema, getAllPositionsHandler)
  fastify.get('/:id', singlePositionSchema, getPositionByIdHandler)
  fastify.post('/', createPositionSchema, createPositionHandler)
  fastify.delete('/:id', deletePositionSchema, deletePositionHandler)
  fastify.put('/:id', updatePositionSchema, updatePositionHandler)
}

export default positionRoutes;