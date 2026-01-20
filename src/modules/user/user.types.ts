type TUser = {
  firstName: string
  midName: string
  lastName: string
  email: string
  company: string
  department: string
  position: string
  addresses: TAddress
  phones: TPhone[]
}

type TAddress = {
  region: string
  city: string
  street: string
  building: string
  apartment: string
}

type TPhone = {
  number: string
  type: PhoneType
}

enum PhoneType {
  WORK = "WORK",
  MOBILE = "MOBILE",
  HOME = "HOME",
  OTHER = "OTHER",
}

export type {TUser}