import type {
  City,
  Company,
  Department,
  Phone,
  Position,
  Region,
  Contact,
  Address
} from "../../generated/prisma/client.js";
import type {PhoneType, IContact} from "./contact.types.js";

type ContactMapper = Contact & {
  company: Company
  department: Department
  position: Position
  address: AddressMapper
  phones: Phone[]
}

type AddressMapper = Address & {
  region: Region
  city: City
}

export function normalizeContact(contact: ContactMapper): IContact {
  return {
    id: contact.id,
    firstName: contact.firstName,
    midName: contact.midName,
    lastName: contact.lastName,
    email: contact.email,
    photo: contact.photo,
    company: contact.company.name,
    department: contact.department.name,
    position: contact.position.name,
    address: {
      region: contact.address.region.name,
      city: contact.address.city.name,
      street: contact.address.street,
      building: contact.address.building,
      apartment: contact.address.apartment,
    },
    phones: contact.phones.map(phone => ({
      type: phone.type as PhoneType,
      phone: phone.phone,
    }))
  }
}