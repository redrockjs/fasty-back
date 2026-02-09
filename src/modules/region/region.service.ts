import {prisma} from "../../shared/config/prisma.js";
import {prismaErrorLogger} from "../../helpers/prismaError.js";

/**
 * Get all regions from DB
 */
export async function getAllRegions() {
  try {
    const regions = await prisma.region.findMany();
    return regions;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}


/**
 * Get region by ID from DB
 */
export async function getRegionById(id: string) {
  try {
    const region = prisma.region.findUnique({
      where: {id}
    })
    return region;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Create region in DB
 */
export async function createRegion(name: string) {
  try {
    const result = await prisma.region.create({
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
export async function deleteRegion(id: string) {
  try {
    const result = await prisma.region.delete({
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
export async function updateRegion(id: string, name: string) {
  try {
    const result = await prisma.region.update({
      where: {id},
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}