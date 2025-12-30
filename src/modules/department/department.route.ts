import type {FastifyInstance} from "fastify";
import {
  getAllDepartmentsHandler,
  getDepartmentByIdHandler,
  createDepartmentHandler,
  deleteDepartmentHandler,
  updateDepartmentHandler
} from "./department.controller.js";
import {
  allDepartmentsSchema,
  singleDepartmentSchema,
  createDepartmentSchema,
  deleteDepartmentSchema,
  updateDepartmentSchema,
} from "./department.schema.js";


async function departmentRoutes(fastify: FastifyInstance) {
  fastify.get('/', allDepartmentsSchema, getAllDepartmentsHandler)
  fastify.get('/:id', singleDepartmentSchema, getDepartmentByIdHandler)
  fastify.post('/', createDepartmentSchema, createDepartmentHandler)
  fastify.delete('/:id', deleteDepartmentSchema, deleteDepartmentHandler)
  fastify.put('/:id', updateDepartmentSchema, updateDepartmentHandler)
}

export default departmentRoutes;