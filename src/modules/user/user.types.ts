type TUser = {
  id: string,
  firstName: string
  midName: string | null
  lastName: string
  email: string
  company: string
  department: string
  position: string
  addresses: TAddress[]
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
  phone: string
  type: TPhoneType
}

enum TPhoneType {
  WORK = "WORK",
  MOBILE = "MOBILE",
  HOME = "HOME",
  OTHER = "OTHER",
}

export type {TUser, TPhoneType}
