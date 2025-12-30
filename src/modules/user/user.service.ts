import {prisma} from "../../shared/config/prisma.js";

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
export async function createUser(name: string) {
  const result = await prisma.user.create({
    data: {
      firstName: 'Иван',
      midName: 'Петрович',
      lastName: 'Судаков',
      email: 'ivan@astra.com',
      company: {
        create: {
          name: 'Astra'
        }
      },
      department: {
        create: {
          name: 'QA'
        }
      },
      position: {
        create: {
          name: "QA-инженер"
        }
      },
      addresses: {},
      phones: {
        create: [
          {
            mobile: "79991234567",
            personal: "7555124567",
            work: "73331234567"
          }
        ]
      }
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