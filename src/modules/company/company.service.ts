import {prisma} from "../../shared/config/prisma.js";
import {prismaErrorLogger} from "../../helpers/prismaError.js";

/**
 * Get all companies from DB
 */
export async function getAllCompanies() {
  try {
    const companies = await prisma.company.findMany();
    return companies;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Get company by ID from DB
 */
export async function getCompanyById(id: string) {
  try {
    const company = prisma.company.findUnique({
      where: {id}
    })

    return company;
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Create company in DB
 */
export async function createCompany(name: string) {
  try {
    const result = await prisma.company.create({
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Delete company by ID from DB
 */
export async function deleteCompany(id: string) {
  try {
    const result = await prisma.company.delete({
      where: {id}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}

/**
 * Update company by ID from DB
 */
export async function updateCompany(id: string, name: string) {
  try {
    const result = await prisma.company.update({
      where: {id},
      data: {name}
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error;
  }
}