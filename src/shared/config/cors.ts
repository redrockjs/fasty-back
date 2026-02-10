import type {FastifyCorsOptions} from '@fastify/cors'

export const corsConfig: FastifyCorsOptions = {
  origin: ['http://localhost:4000', 'https://fasty.example.com'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}