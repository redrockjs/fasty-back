import {type FastifyReply, type FastifyRequest} from "fastify";
import {createUser, loginUser, logoutUser, refreshAccessToken, updateUserPassword} from "./auth.service.js";
import type {IUser} from "./auth.types.js";

type UserRequest = Omit<IUser, 'id' | 'createdAt'>

type UpdateUserRequest = {
  oldPassword: string,
} & IUser

type Token = {
  accessToken: string,
  refreshToken: string,
}

export async function loginUserHandler(request: FastifyRequest<{
  Body: Omit<UserRequest, "id">
}>, reply: FastifyReply) {
  try {
    const {email, password} = request.body;

    const {id, refreshToken} = await loginUser({email, password});

    const accessToken = request.server.jwt.sign(
      {userId: id},
      {expiresIn: '15m'},
    )

    return reply.code(200).send({
      access: accessToken,
      refresh: refreshToken,
    })
  } catch (error) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function refreshTokenHandler(request: FastifyRequest<{
  Body: Pick<Token, 'refreshToken'>
}>, reply: FastifyReply) {
  try {
    const {refreshToken} = request.body;

    const {id} = await refreshAccessToken({refreshToken});

    const accessToken = request.server.jwt.sign(
      {userId: id},
      {expiresIn: '15m'},
    )

    return reply.code(200).send({
      access: accessToken,
      refresh: refreshToken
    })
  } catch (error) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function logoutUserHandler(request: FastifyRequest<{
  Body: Pick<Token, 'refreshToken'>
}>, reply: FastifyReply) {
  try {
    const {refreshToken} = request.body;

    await logoutUser({refreshToken})

    return reply.code(200).send({
      message: 'Logout user',
      result: 'success'
    })
  } catch (error) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createUserHandler(request: FastifyRequest<{
  Body: Omit<UserRequest, 'id'>
}>, reply: FastifyReply) {
  try {
    const {firstName, lastName, email, password, role} = request.body

    const user = await createUser({firstName, lastName, email, password, role})

    return reply.code(201).send({
      message: `Successfully register user ${firstName} ${lastName} with id: ${user?.id}`,
      result: 'success'
    })
  } catch (e) {
    if (e instanceof Error && e.message === 'EMAIL_ALREADY_EXISTS') {
      return reply.code(409).send({message: 'User already exists, try unique email address'})
    }
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updatePasswordHandler(request: FastifyRequest<{
  Params: Pick<UpdateUserRequest, 'id'>
  Body: Pick<UpdateUserRequest, 'password' | 'oldPassword'>
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {password, oldPassword} = request.body

    return reply.code(200).send({
      message: 'Update password',
      result: 'success'
    })
  } catch (e) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteUserHandler(request: FastifyRequest<{
  Params: Pick<IUser, 'id'>
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    console.log('🍒', id, "User deleted")

    return reply.code(200).send({
      message: `Successfully delete user with id: ${id}`,
      result: 'success'
    })
  } catch (e) {
    request.log.error(e)
    if (e instanceof Error && e.message === 'User not found') {
      return reply.code(404).send({message: 'User not found'});
    }
    return reply.code(500).send({message: "Something went wrong"});
  }
}

