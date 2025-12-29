import {prisma} from '../../shared/config/prisma.js'

export async function getCompanies() {
  return prisma.company.findMany();
}