import {prisma} from "../../shared/config/prisma.js";

/**
 * Get all regions from DB
 */
export async function getAllRegions() {
  const regions = await prisma.region.findMany();

  return regions;
}


/**
 * Get region by ID from DB
 */
export async function getRegionById(id: string) {
  const region = prisma.region.findUnique({
    where: {
      id: id,
    }
  })

  return region;
}

/**
 * Create region in DB
 */
export async function createRegion(name: string) {
  const result = await prisma.region.create({
    data: {
      name: name,
    }
  })
  return result
}

/**
 * Delete city by ID from DB
 */
export async function deleteRegion(id: string) {
  const result = await prisma.region.delete({
    where: {
      id: id,
    }
  })
  return result
}

/**
 * Update city by ID from DB
 */
export async function updateRegion(id: string, name: string) {
  const result = await prisma.region.update({
    where: {
      id: id
    },
    data: {
      name: name,
    }
  })
  return result
}