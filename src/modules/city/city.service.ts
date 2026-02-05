import {prisma} from "../../shared/config/prisma.js";
import {prismaErrorLogger} from "../../helpers/prismaError.js";

/**
 * Get all cities from DB
 */
export async function getAllCities() {
  try {
    const cities = await prisma.city.findMany();
    return cities;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }

}


/**
 * Get city by ID from DB
 */
export async function getCityById(id: string) {
  try {
    const city = await prisma.city.findUnique({
      where: {id}
    })
    return city;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Create city in DB
 */
export async function createCity(name: string) {
  try {
    const result = await prisma.city.create({
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Delete city by ID from DB
 */
export async function deleteCity(id: string) {
  try {
    const result = await prisma.city.delete({
      where: {id}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Update city by ID from DB
 */
export async function updateCity(id: string, name: string) {
  try {
    const result = await prisma.city.update({
      where: {id},
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}