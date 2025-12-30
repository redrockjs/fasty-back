import type {FastifyInstance} from "fastify";
import {
  getAllCompaniesHandler,
  getCompanyByIdHandler,
  createCompanyHandler,
  deleteCompanyHandler,
  updateCompanyHandler
} from "./company.controller.js";
import {
  allCompaniesSchema,
  singleCompanySchema,
  createCompanySchema,
  deleteCompanySchema,
  updateCompanySchema
} from "./company.schema.js";


async function cityRoutes(fastify: FastifyInstance) {
  fastify.get('/', allCompaniesSchema, getAllCompaniesHandler)
  fastify.get('/:id', singleCompanySchema, getCompanyByIdHandler)
  fastify.post('/', createCompanySchema, createCompanyHandler)
  fastify.delete('/:id', deleteCompanySchema, deleteCompanyHandler)
  fastify.put('/:id', updateCompanySchema, updateCompanyHandler)
}

export default cityRoutes;