import {type FastifyReply, type FastifyRequest} from "fastify";


type UserRequest = {
  id: string;
  email: string,
  password: string,
}

type UpdateUserRequest = {
  oldPassword: string,
} & UserRequest

type Token = {
  accessToken: string,
  refreshToken: string,
}

export async function loginUserHandler(request: FastifyRequest<{
  Body: Omit<UserRequest, "id">
}>, reply: FastifyReply) {
  try {
    const {email, password} = request.body;
    console.log('🍒', email, password);

    return reply.code(201).send({
      message: 'Login user',
      result: 'success'
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
    console.log('🍒', refreshToken);

    return reply.code(201).send({
      message: 'Update refresh token',
      result: 'success'
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
    console.log('🍒', refreshToken);

    return reply.code(201).send({
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
    const {email, password} = request.body
    console.log('🍒', email, password)

    return reply.code(201).send({
      message: 'Successfully register user',
      result: 'success'
    })
  } catch (error) {
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
    console.log('🍒', id, password, oldPassword)

    return reply.code(200).send({
      message: 'Update password',
      result: 'success'
    })
  } catch (error) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteUserHandler(request: FastifyRequest<{
  Params: Pick<UserRequest, 'id'>
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    console.log('🍒', id, "User deleted")

    return reply.code(200).send({
      message: `Successfully delete user with id: ${id}`,
      result: 'success'
    })
  } catch (error) {
    request.log.error(error)
    if (error instanceof Error && error.message === 'User not found') {
      return reply.code(404).send({message: error.message});
    }
    return reply.code(500).send({message: "Something went wrong"});
  }
}

