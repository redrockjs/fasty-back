import type {FastifyInstance} from "fastify";
import {
  loginUserHandler,
  logoutUserHandler,
  refreshTokenHandler,
  createUserHandler,
  updatePasswordHandler,
  deleteUserHandler, getMeHandler
} from "./auth.controller.js";
import {
  loginUserSchema,
  refreshTokenSchema,
  logoutUserSchema,
  createUserSchema,
  updatePasswordSchema,
  deleteUserSchema,
  getUserInfoSchema,
} from "./auth.schema.js";

async function authRoutes(fastify: FastifyInstance) {
  fastify.get('/me', {
    preHandler:[],
    schema: getUserInfoSchema.schema
  }, getMeHandler)
  fastify.post('/login', loginUserSchema, loginUserHandler)
  fastify.post('/logout', logoutUserSchema, logoutUserHandler)
  fastify.post('/refresh', refreshTokenSchema, refreshTokenHandler)
  fastify.post('/', createUserSchema, createUserHandler)
  fastify.patch('/:id', updatePasswordSchema, updatePasswordHandler)
  fastify.delete('/:id', deleteUserSchema, deleteUserHandler)
}

export default authRoutes;