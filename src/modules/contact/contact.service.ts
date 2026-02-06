import {prisma} from "../../shared/config/prisma.js";
import type {IContact} from "./contact.types.js";
import {normalizeContact} from "./contact.mapper.js";
import {prismaErrorLogger} from "../../helpers/prismaError.js";

/**
 * Get all contacts from DB
 */
export async function getAllContacts() {
  try {
    const contacts = await prisma.contact.findMany({
      include: {
        company: true,
        department: true,
        position: true,
        address: {
          include: {
            region: true,
            city: true,
          }
        },
        phones: true,
      },
    });
    return contacts.map(contact => normalizeContact(contact));
  } catch (error) {
    prismaErrorLogger(error)
    throw error
  }
}

/**
 * Get contact by ID from DB
 */
export async function getContactById(id: string) {
  try {
    const user = await prisma.contact.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
        department: true,
        position: true,
        address: {
          include: {
            region: true,
            city: true,
          }
        },
        phones: true,
      },
    })

    if (!user) return null

    return normalizeContact(user);
  } catch (error) {
    prismaErrorLogger(error)
    throw error
  }
}

/**
 * Create contact in DB
 */
export async function createContact({...props}: IContact) {
  const {firstName, midName, lastName, email, company, department, position, address, phones} = props

  try {
    const result = await prisma.contact.create({
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
        address: {
          create: {
            street: address.street,
            building: Number(address.building),
            apartment: Number(address.apartment),

            region: {
              connectOrCreate: {
                where: {name: address.region},
                create: {name: address.region},
              },
            },

            city: {
              connectOrCreate: {
                where: {name: address.city},
                create: {name: address.city},
              },
            },
          },
        },
        phones: {
          create: phones
        }
      }
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error
  }
}

/**
 * Delete contact by ID from DB
 */
export async function deleteContact(id: string) {
  try {
    const result = await prisma.contact.delete({
      where: {
        id: id,
      }
    })
    return result
  } catch (error) {
    prismaErrorLogger(error)
    throw error
  }
}

/**
 * Update contact by ID from DB
 */
export async function updateContact({...props}: { requestId: string } & IContact) {
  const {requestId, firstName, midName, lastName, email, company, department, position, addresses, phones} = props

  try {
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
                where: {name: address.region},
                create: {name: address.region},
              },
            },
            city: {
              connectOrCreate: {
                where: {name: address.city},
                create: {name: address.city},
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

      return tx.contact.update({
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
  } catch (error) {
    prismaErrorLogger(error)
    throw error
  }
}