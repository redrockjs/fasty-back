import {prisma} from "../../shared/config/prisma.js";
import type {TContact} from "./contact.types.js";
import {normalizeContact} from "./contact.mapper.js";

/**
 * Get all contacts from DB
 */
export async function getAllContacts() {
  const contacts = await prisma.contact.findMany();

  return contacts;
}

/**
 * Get contact by ID from DB
 */
export async function getContactById(id: string) {
  const user = await prisma.contact.findUnique({
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

  return normalizeContact(user);
}

/**
 * Create contact in DB
 */
export async function createContact({...props}: TContact) {

  const {firstName, midName, lastName, email, company, department, position, addresses, phones} = props

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
      addresses: {
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
      },
      phones: {
        create: phones
      }
    }
  })
  return result
}

/**
 * Delete contact by ID from DB
 */
export async function deleteContact(id: string) {
  const result = await prisma.contact.delete({
    where: {
      id: id,
    }
  })
  return result
}

/**
 * Update contact by ID from DB
 */
export async function updateContact({...props}: { requestId: string } & TContact) {

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

}