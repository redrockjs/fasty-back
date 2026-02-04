import type {FastifyInstance} from "fastify";
import {
  loginUserHandler,
  logoutUserHandler,
  refreshTokenHandler,
  createUserHandler,
  updatePasswordHandler,
  deleteUserHandler,
  getMeHandler,
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
import type {TToken, TUpdatePassword} from "./auth.types.js";

async function authRoutes(fastify: FastifyInstance) {
  // no-auth
  fastify.post('/', createUserSchema, createUserHandler)
  fastify.post('/login', loginUserSchema, loginUserHandler)
  fastify.post('/refresh', refreshTokenSchema, refreshTokenHandler)

  // with-auth
  fastify.get('/me', {preHandler: [fastify.authenticate], schema: getUserInfoSchema.schema}, getMeHandler)

  fastify.post<{ Body: Pick<TToken, 'refreshToken'> }>('/logout',
    {
      preHandler: [fastify.authenticate],
      schema: logoutUserSchema.schema
    }, logoutUserHandler)

  fastify.patch<{ Body: TUpdatePassword }>('/', {
    preHandler: [fastify.authenticate],
    schema: updatePasswordSchema.schema
  }, updatePasswordHandler)

  fastify.delete('/', {preHandler: [fastify.authenticate], schema: deleteUserSchema.schema}, deleteUserHandler)
}

export default authRoutes;