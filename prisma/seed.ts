import {PrismaClient} from '../src/generated/prisma/client.js'
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: `postgresql://${process.env.POSTGRES_USER}:` +
    `${encodeURIComponent(process.env.POSTGRES_PASSWORD!)}@` +
    `${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/` +
    `${process.env.POSTGRES_DATABASE}?schema=public`
});

import regions from './data/regions.json' with {type: 'json'};
import cities from './data/cities.json' with {type: 'json'};

const prisma = new PrismaClient({adapter})

async function main() {

  for (let region of regions) {
    await prisma.region.create({
      data: {
        name: region.name,
      }
    })
  }

  for (let city of cities) {
    await prisma.city.create({
      data: {
        name: city.name,
      }
    })
  }
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })