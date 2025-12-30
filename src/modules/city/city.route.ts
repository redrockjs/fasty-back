import type {FastifyInstance} from "fastify";
import {
  getAllCitiesHandler,
  getCityByIdHandler,
  createCityHandler,
  deleteCityHandler,
  updateCityHandler
} from "./city.controller.js";
import {
  allCitySchema,
  singleCitySchema,
  createCitySchema,
  updateCitySchema,
  deleteCitySchema
} from "./city.schema.js";


async function cityRoutes(fastify: FastifyInstance) {
  // Get All items
  fastify.get('/', allCitySchema, getAllCitiesHandler)
  // Get item by ID
  fastify.get('/:id', singleCitySchema, getCityByIdHandler)
  // Create item
  fastify.post('/', createCitySchema, createCityHandler)
  // Delete item
  fastify.delete('/:id', deleteCitySchema, deleteCityHandler)
  // Update item
  fastify.put('/:id', updateCitySchema, updateCityHandler)
}

export default cityRoutes;