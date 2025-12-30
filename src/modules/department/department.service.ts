import {prisma} from "../../shared/config/prisma.js";

/**
 * Get all departments from DB
 */
export async function getAllDepartments() {
  const departments = await prisma.department.findMany();

  return departments;
}


/**
 * Get department by ID from DB
 */
export async function getDepartmentById(id: string) {
  const department = prisma.department.findUnique({
    where: {
      id: id,
    }
  })

  return department;
}

/**
 * Create department in DB
 */
export async function createDepartment(name: string) {
  const result = await prisma.department.create({
    data: {
      name: name,
    }
  })
  return result
}

/**
 * Delete department by ID from DB
 */
export async function deleteDepartment(id: string) {
  const result = await prisma.department.delete({
    where: {
      id: id,
    }
  })
  return result
}

/**
 * Update department by ID from DB
 */
export async function updateDepartment(id: string, name: string) {
  const result = await prisma.department.update({
    where: {
      id: id
    },
    data: {
      name: name,
    }
  })
  return result
}