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
  addresses: AddressMapper[]
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
    company: contact.company.name,
    department: contact.department.name,
    position: contact.position.name,
    addresses: contact.addresses.map(address => ({
      region: address.region.name,
      city: address.city.name,
      street: address.street,
      building: address.building,
      apartment: address.apartment
    })),
    phones: contact.phones.map(phone => ({
      type: phone.type as PhoneType,
      phone: phone.phone,
    }))
  }
}