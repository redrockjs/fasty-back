import "dotenv/config";
import {PrismaPg} from '@prisma/adapter-pg'
import {PrismaClient} from '../../generated/prisma/client.js'

const connectionString = process.env.DATABASE_URL =
  `postgresql://${process.env.POSTGRES_USER}:` +
  `${encodeURIComponent(process.env.POSTGRES_PASSWORD!)}@` +
  `${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/` +
  `${process.env.POSTGRES_DATABASE}?schema=public`

const adapter = new PrismaPg({connectionString})
const prisma = new PrismaClient({adapter})

export {prisma}