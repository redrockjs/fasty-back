import {prisma} from "../../shared/config/prisma.js";
import type {TUser} from "./user.types.js";

/**
 * Get all users from DB
 */
export async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}


/**
 * Get user by ID from DB
 */
export async function getUserById(id: string) {
  const user = prisma.user.findUnique({
    where: {
      id: id,
    }
  })

  return user;
}

/**
 * Create user in DB
 */
export async function createUser({...props}: TUser) {

  const {firstName, midName, lastName, email, company, department, position, addresses, phones} = props

  const result = await prisma.user.create({
    data: {
      firstName,
      midName,
      lastName,
      email,
      company: {
        connectOrCreate: {
          where: {
            name: company,
          }
        },
        create: {
          name: company,
        }
      },
      department: {
        create: {
          name: department,
        }
      },
      position: {
        create: {
          name: position,
        }
      },
      addresses: {},
      phones: {}
    }
  })
  return result
}

/**
 * Delete user by ID from DB
 */
export async function deleteUser(id: string) {
  const result = await prisma.user.delete({
    where: {
      id: id,
    }
  })
  return result
}

/**
 * Update user by ID from DB
 */
export async function updateUser(id: string, name: string) {
  // const result = await prisma.user.update({
  //   where: {
  //     id: id
  //   },
  //   data: {
  //
  //   }
  // })
  // return result
}