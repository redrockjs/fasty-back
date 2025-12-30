import {getCompanies} from "./company.service.js";
import {prisma} from "../../shared/config/prisma.js";

export async function getAllCompaniesHandler() {
  const result = await getCompanies();

  console.log('🍒', result);

  return result;
}