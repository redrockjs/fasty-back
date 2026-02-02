import type {FastifyInstance} from "fastify";

export function generateTokens(fastify: FastifyInstance, payload: any) {
  const accessToken = fastify.jwt.sign(payload, {
    expiresIn: '15m'
  })

  const refreshToken = fastify.jwt.sign(payload, {
    expiresIn: '30d'
  })

  return { accessToken, refreshToken }
}