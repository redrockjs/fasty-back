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
  appartment: string
}

type TPhone = {
  mobile: string
  personal: string
  work: string
}

export type {TUser}