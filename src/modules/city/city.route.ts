import type {FastifyInstance} from "fastify";
import {
  getAllCitiesHandler,
  getCityByIdHandler,
  createCityHandler,
  deleteCityHandler,
  updateCityHandler
} from "./city.controller.js";
import {
  allCitiesSchema,
  singleCitySchema,
  createCitySchema,
  updateCitySchema,
  deleteCitySchema
} from "./city.schema.js";

async function cityRoutes(fastify: FastifyInstance) {
  fastify.get('/', allCitiesSchema, getAllCitiesHandler) // Get All items
  fastify.get('/:id', singleCitySchema, getCityByIdHandler) // Get item by ID
  fastify.post('/', createCitySchema, createCityHandler) // Create item
  fastify.delete('/:id', deleteCitySchema, deleteCityHandler) // Delete item
  fastify.put('/:id', updateCitySchema, updateCityHandler) // Update item
}

export default cityRoutes;