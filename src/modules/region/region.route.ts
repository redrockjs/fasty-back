import type {FastifyInstance} from "fastify";
import {
  allRegionsSchema,
  singleRegionSchema,
  createRegionSchema,
  deleteRegionSchema,
  updateRegionSchema
} from "./region.schema.js";
import {
  createRegionHandler,
  deleteRegionHandler,
  getAllRegionsHandler,
  getRegionByIdHandler,
  updateRegionHandler
} from "./region.controller.js";

async function regionRoutes(fastify: FastifyInstance) {
  fastify.get('/', allRegionsSchema, getAllRegionsHandler)
  fastify.get('/:id', singleRegionSchema, getRegionByIdHandler)
  fastify.post('/', createRegionSchema, createRegionHandler)
  fastify.delete('/:id', deleteRegionSchema, deleteRegionHandler)
  fastify.put('/:id', updateRegionSchema, updateRegionHandler)
}

export default regionRoutes