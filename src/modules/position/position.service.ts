import {prisma} from "../../shared/config/prisma.js";

/**
 * Get all positions from DB
 */
export async function getAllPositions() {
  const positions = await prisma.position.findMany();

  return positions;
}


/**
 * Get position by ID from DB
 */
export async function getPositionById(id: string) {
  const position = prisma.position.findUnique({
    where: {
      id: id,
    }
  })

  return position;
}

/**
 * Create position in DB
 */
export async function createPosition(name: string) {
  const result = await prisma.position.create({
    data: {
      name: name,
    }
  })
  return result
}

/**
 * Delete position by ID from DB
 */
export async function deletePosition(id: string) {
  const result = await prisma.position.delete({
    where: {
      id: id,
    }
  })
  return result
}

/**
 * Update position by ID from DB
 */
export async function updatePosition(id: string, name: string) {
  const result = await prisma.position.update({
    where: {
      id: id
    },
    data: {
      name: name,
    }
  })
  return result
}