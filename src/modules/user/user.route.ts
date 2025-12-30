import type {FastifyInstance} from "fastify";

import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  deleteUserHandler,
  updateUserHandler
} from './user.controller.js'

async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/', {}, getAllUsersHandler)
  fastify.get('/:id', {}, getUserByIdHandler)
  fastify.post('/', {}, createUserHandler)
  fastify.delete('/:id', {}, deleteUserHandler)
  fastify.put('/:id', {}, updateUserHandler)
}

export default userRoutes