import {prisma} from "../../shared/config/prisma.js";
import {prismaErrorLogger} from "../../helpers/prismaError.js";

/**
 * Get all positions from DB
 */
export async function getAllPositions() {
  try {

  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
  const positions = await prisma.position.findMany();

  return positions;
}


/**
 * Get position by ID from DB
 */
export async function getPositionById(id: string) {
  try {

  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
  const position = prisma.position.findUnique({
    where: {id}
  })

  return position;
}

/**
 * Create position in DB
 */
export async function createPosition(name: string) {
  try {
    const result = await prisma.position.create({
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Delete position by ID from DB
 */
export async function deletePosition(id: string) {
  try {
    const result = await prisma.position.delete({
      where: {id}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Update position by ID from DB
 */
export async function updatePosition(id: string, name: string) {
  try {
    const result = await prisma.position.update({
      where: {id},
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}