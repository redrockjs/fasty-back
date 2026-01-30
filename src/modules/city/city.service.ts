import {prisma} from "../../shared/config/prisma.js";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";

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
  const city = await prisma.city.findUnique({
    where: {id}
  })
  return city;
}

/**
 * Create city in DB
 */
export async function createCity(name: string) {
  const result = await prisma.city.create({
    data: {name}
  })
  return result
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
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') throw new Error('City not found'); // P2025 — запись не найдена
    }
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
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') throw new Error('City not found'); // P2025 — запись не найдена
    }
    throw error;
  }
}