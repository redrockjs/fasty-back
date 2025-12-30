import {type FastifyReply, type FastifyRequest} from "fastify";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "./user.service.js";

type GetUserRequest = {
  id: string
}

type CreateUserRequest = {
  name: string
}

export async function getAllUsersHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllUsers()
    request.log.info(result)
    reply.code(200).send(result)
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getUserByIdHandler(request: FastifyRequest<{ Params: GetUserRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params

    //if (!id) reply.code(400).send({message: "City id is required"})

    const result = await getUserById(id);
    request.log.info(result)
    reply.code(200)
    return result
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createUserHandler(request: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply) {
  try {
    const {name} = request.body
    const result = await createUser(name)
    request.log.info(result)
    reply.code(201)

    return {
      message: 'Successfully created city',
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteUserHandler(request: FastifyRequest<{ Params: GetUserRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteUser(id)
    request.log.info(result)
    reply.code(200)

    return {
      message: `Successfully delete user with id: ${id}`,
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updateUserHandler(request: FastifyRequest<{
  Params: GetUserRequest,
  Body: CreateUserRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {name} = request.body

    const result = await updateUser(id, name)
    request.log.info(result)
    reply.code(200)

    return {
      message: `Successfully updated user with id: ${id}`,
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
