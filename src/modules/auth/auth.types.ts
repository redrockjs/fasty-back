export interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IRefreshToken {
  id: string
  token: string
  revoked: boolean
  createdAt: Date
  expiresAt: Date
}


export type TUserRequest = Omit<IUser, 'id' | 'createdAt'>

export type TUpdatePassword = Pick<IUser, 'password'> & { oldPassword: string }

export type TToken = {
  accessToken: string,
  refreshToken: string,
}