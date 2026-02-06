interface IContact {
  id: string,
  firstName: string
  midName: string | null
  lastName: string
  email: string
  company: string
  department: string
  position: string
  addresses: IAddress[]
  phones: IPhone[]
}

interface IAddress {
  region: string
  city: string
  street: string
  building: number
  apartment: number
}

interface IPhone {
  phone: string
  type: PhoneType
}

enum PhoneType {
  WORK = "WORK",
  MOBILE = "MOBILE",
  HOME = "HOME",
  OTHER = "OTHER",
}

export type {IContact, IPhone, PhoneType}
