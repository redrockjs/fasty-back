import {prisma} from "../../shared/config/prisma.js";
import type {TUser} from "./user.types.js";
import {normalizeUser} from "./user.mapper.js";

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
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      company: true,
      department: true,
      position: true,
      addresses: {
        include: {
          region: true,
          city: true,
        }
      },
      phones: true,
    },
  })


  if (!user) {
    return null
  }

  return normalizeUser(user);
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
          },
          create: {
            name: company
          }
        }
      },
      department: {
        connectOrCreate: {
          where: {
            name: department,
          },
          create: {
            name: department
          }
        }
      },
      position: {
        connectOrCreate: {
          where: {
            name: position
          },
          create: {
            name: position
          }
        }
      },
      // --- address ---
      addresses: {
        create: addresses.map(address => ({
          street: address.street,
          building: Number(address.building),
          apartment: Number(address.apartment),

          region: {
            connectOrCreate: {
              where: { name: address.region },
              create: { name: address.region },
            },
          },

          city: {
            connectOrCreate: {
              where: { name: address.city },
              create: { name: address.city },
            },
          },
        })),
      },
      phones: {
        create: phones
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
export async function updateUser({...props}: { requestId: string } & TUser) {

  const {requestId, firstName, midName, lastName, email, company, department, position, addresses, phones} = props

  return prisma.$transaction(async (tx) => {
    const data: any = {
      firstName,
      midName,
      lastName,
      email,
    }

    if (company) {
      data.company = {
        connectOrCreate: {
          where: {name: company},
          create: {name: company},
        },
      }
    }

    if (department) {
      data.department = {
        connectOrCreate: {
          where: {name: department},
          create: {name: department},
        },
      }
    }

    if (position) {
      data.position = {
        connectOrCreate: {
          where: {name: position},
          create: {name: position},
        },
      }
    }

    if (addresses) {
      data.addresses = {
        deleteMany: {},
        create: addresses.map(address => ({
          street: address.street,
          building: Number(address.building),
          apartment: Number(address.apartment),
          region: {
            connectOrCreate: {
              where: { name: address.region },
              create: { name: address.region },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: address.city },
              create: { name: address.city },
            },
          },
        })),
      }
    }


    if (phones) {
      data.phones = {
        deleteMany: {},
        create: phones.map(phone => ({
          type: phone.type,
          phone: phone.phone,
        })),
      }
    }

    return tx.user.update({
      where: {id: requestId},
      data,
      include: {
        company: true,
        department: true,
        position: true,
        addresses: {include: {region: true, city: true}},
        phones: true,
      },
    })
  })

}