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

/**
 * Create city in DB
 */
export async function createCity(name: string) {
  const result = await prisma.city.create({
    data: {
      name: name,
    }
  })
  return result
}

/**
 * Delete city by ID from DB
 */
export async function deleteCity(id: string) {
  const result = await prisma.city.delete({
    where: {
      id: id,
    }
  })
  return result
}

/**
 * Update city by ID from DB
 */
export async function updateCity(id: string, name: string) {
  const result = await prisma.city.update({
    where: {
      id: id
    },
    data: {
      name: name,
    }
  })
  return result
}