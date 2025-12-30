import type {FastifyInstance} from "fastify";
import {getAllCitiesHandler, getCityByIdHandler} from "./city.controller.js";
import {allCitySchema, singleCitySchema} from "./city.schema.js";


async function cityRoutes(fastify: FastifyInstance) {

  // Get All
  fastify.get('/', allCitySchema, getAllCitiesHandler)
  // Get by ID
  fastify.get('/:id', singleCitySchema, getCityByIdHandler)
}

export default cityRoutes;