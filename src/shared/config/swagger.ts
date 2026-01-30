import type {FastifyDynamicSwaggerOptions} from '@fastify/swagger'

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  mode: "dynamic",
  openapi: {
    info: {
      title: "Fasty Prisma REST API",
      description: "A REST API built with Fastify, Prisma and TypeScript",
      version: "0.1.0",
      contact: {
        name: "Alex Smith",
        url: "https://github.com/redrockjs",
      },
    },
    externalDocs: {
      url: "https://github.com/redrockjs/fasty-back",
      description: "Fastify backend repo on GitHub",
    },
  },
}