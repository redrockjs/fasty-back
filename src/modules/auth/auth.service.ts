import {prisma} from "../../shared/config/prisma.js";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";
import {comparePassword, hashPassword} from "../../helpers/password.js";
import {generateRefreshToken} from "../../helpers/refreshToken.js";
import type {IUser} from "./auth.types.js";

/**
 *  Create user in DB
 */
export async function createUser({firstName, lastName, email, password, role}: Omit<IUser, 'id' | 'createdAt'>) {

  const passwordHash = await hashPassword(password);
  try {
    const data = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: passwordHash,
        role,
      }
    })
    const {password: _, ...result} = data
    return result

  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') throw new Error('EMAIL_ALREADY_EXISTS') // P2002 Some field not found
    }
    throw error;
  }
}

/**
 *  Update user password in DB
 */
export async function updateUserPassword({id, password}: Pick<IUser, 'id' | 'password'>) {
  try {
    const passwordHash = await hashPassword(password);
    const data = await prisma.user.update({
      where: {id},
      data: {password: passwordHash}
    })
    const {password: _, ...result} = data
    return result
  } catch (error) {
    console.error('🍒', error)
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') throw new Error('User not found'); // P2025 — запись не найдена
    }
    throw error;
  }
}

/**
 *  Compare user password from DB
 */
export async function checkPassword({id, password}:Pick<IUser, 'id' | 'password'>) {
  try {
    const user = await prisma.user.findFirst({where: {id}})
    return user && await comparePassword(password, user.password)
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2025') throw new Error('User not found'); // P2025 — запись не найдена
    }
    throw e
  }
}

/**
 *  Delete user from DB
 */
export async function deleteUser({id}: Pick<IUser, 'id'>) {
  try {
    const data = await prisma.user.delete({
      where: {id}
    })
    const {id: userId} = data
    return {id: userId}
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') throw new Error('User not found'); // P2025 — запись не найдена
    }
    throw error;
  }
}

/**
 *  Login user
 */
export async function loginUser({email, password}: Pick<IUser, 'email' | 'password'>) {
  const user = await prisma.user.findUnique({where: {email}});
  if (!user) throw new Error('Invalid credentials');

  const isValid = await comparePassword(password, user.password)
  if (!isValid) throw new Error('Invalid credentials');

  const refreshToken = generateRefreshToken()
  const refreshTokenHash = await hashPassword(refreshToken)

  await prisma.refreshToken.create({
    data: {
      token: refreshTokenHash,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
  })

  return {
    id: user.id,
    refreshToken
  }
}

/**
 *  Logout user
 */
export async function logoutUser({refreshToken}: { refreshToken: string }) {

  const result = await prisma.refreshToken.update({
    where: {
      token: refreshToken
    },
    data: {
      revoked: true
    }
  })

  return result;
}

/**
 *  Refresh token
 */
export async function refreshAccessToken({refreshToken}: { refreshToken: string }) {
  const tokens = await prisma.refreshToken.findMany({
    where: {revoked: false},
    include: {user: true}
  })

  let storedToken = null

  for (const t of tokens) {
    if (await comparePassword(refreshToken, t.token)) {
      storedToken = t
      break
    }
  }

  if (!storedToken) throw new Error('Invalid refresh token');
  if (storedToken.expiresAt < new Date()) throw new Error('Expired refresh token');

  await prisma.refreshToken.update({
    where: {id: storedToken.id},
    data: {revoked: true}
  })

  return {
    id: storedToken.id,
  }
}