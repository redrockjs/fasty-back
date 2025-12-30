import {prisma} from "../../shared/config/prisma.js";

/**
 * Get all cities from DB
 */
export async function getAllCities() {
  const cities = await prisma.city.findMany();

  return cities;
}


/**
 * Get city by ID from DB
 */
export async function getCityById(id: string) {
  const city = prisma.city.findUnique({
    where: {
      id: id,
    }
  })

  return city;
}

