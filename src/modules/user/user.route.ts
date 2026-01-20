import type {FastifyInstance} from "fastify";

import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler
} from './user.controller.js'
import {allUsersSchema, createUserSchema, deleteUserSchema, singleUserSchema, updateUserSchema} from "./user.schema.js";

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/', allUsersSchema, getAllUsersHandler)
  fastify.get('/:id', singleUserSchema, getUserByIdHandler)
  fastify.post('/', createUserSchema, createUserHandler)
  fastify.delete('/:id', deleteUserSchema, deleteUserHandler)
  fastify.put('/:id', /*updateUserSchema*/{}, updateUserHandler)
}

export default userRoutes