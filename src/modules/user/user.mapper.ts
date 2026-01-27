import type {City, Company, Department, Phone, Position, Region, User, Address} from "../../generated/prisma/client.js";
import type {TPhoneType, TUser} from "./user.types.js";

type UserMapper = User & {
  company: Company | null
  department: Department
  position: Position
  addresses: AddressMapper[]
  phones: Phone[]
}

type AddressMapper = Address & {
  region: Region
  city: City
}

export function normalizeUser(user: UserMapper): TUser {

  return {
    id: user.id,
    firstName: user.firstName,
    midName: user.midName,
    lastName: user.lastName,
    email: user.email,
    company: user.company ? user.company.name : null,
    department: user.department.name,
    position: user.position.name,
    addresses: user.addresses.map(address => ({
      region: address.region.name,
      city: address.city.name,
      street: address.street,
      building: String(address.building),
      apartment: String(address.apartment)
    })),
    phones: user.phones.map(phone => ({
      type: phone.type as TPhoneType,
      phone: phone.phone,
    }))
  }
}