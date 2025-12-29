import {prisma} from '../src/shared/config/prisma.js'

import regions from './data/regions.json' with {type: 'json'};
import cities from './data/cities.json' with {type: 'json'};

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