import {prisma} from "../../shared/config/prisma.js";

/**
 * Get all companies from DB
 */
export async function getAllCompanies() {
  const companies = await prisma.company.findMany();

  return companies;
}


/**
 * Get company by ID from DB
 */
export async function getCompanyById(id: string) {
  const company = prisma.company.findUnique({
    where: {
      id: id,
    }
  })

  return company;
}

/**
 * Create company in DB
 */
export async function createCompany(name: string) {
  const result = await prisma.company.create({
    data: {
      name: name,
    }
  })
  return result
}

/**
 * Delete company by ID from DB
 */
export async function deleteCompany(id: string) {
  const result = await prisma.company.delete({
    where: {
      id: id,
    }
  })
  return result
}

/**
 * Update company by ID from DB
 */
export async function updateCompany(id: string, name: string) {
  const result = await prisma.company.update({
    where: {
      id: id
    },
    data: {
      name: name,
    }
  })
  return result
}