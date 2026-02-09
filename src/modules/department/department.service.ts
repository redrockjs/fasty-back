import {prisma} from "../../shared/config/prisma.js";
import {prismaErrorLogger} from "../../helpers/prismaError.js";

/**
 * Get all departments from DB
 */
export async function getAllDepartments() {
  try {
    const departments = await prisma.department.findMany();
    return departments;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}


/**
 * Get department by ID from DB
 */
export async function getDepartmentById(id: string) {
  try {
    const department = prisma.department.findUnique({
      where: {id}
    })
    return department;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Create department in DB
 */
export async function createDepartment(name: string) {
  try {
    const result = await prisma.department.create({
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Delete department by ID from DB
 */
export async function deleteDepartment(id: string) {
  try {
    const result = await prisma.department.delete({
      where: {id}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Update department by ID from DB
 */
export async function updateDepartment(id: string, name: string) {
  try {
    const result = await prisma.department.update({
      where: {id},
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}