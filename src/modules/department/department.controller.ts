import {type FastifyReply, type FastifyRequest} from "fastify";
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  deleteDepartment,
  updateDepartment
} from "./department.service.js";

type GetDepartmentRequest = {
  id: string
}

type CreateDepartmentRequest = {
  name: string
}

export async function getAllDepartmentsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllDepartments()
    request.log.info(result)
    reply.code(200).send(result)
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getDepartmentByIdHandler(request: FastifyRequest<{ Params: GetDepartmentRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params

    //if (!id) reply.code(400).send({message: "City id is required"})

    const result = await getDepartmentById(id);
    request.log.info(result)
    reply.code(200)
    return result
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createDepartmentHandler(request: FastifyRequest<{ Body: CreateDepartmentRequest }>, reply: FastifyReply) {
  try {
    const {name} = request.body
    const result = await createDepartment(name)
    request.log.info(result)
    reply.code(201)

    return {
      message: 'Successfully created department',
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteDepartmentHandler(request: FastifyRequest<{ Params: GetDepartmentRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteDepartment(id)
    request.log.info(result)
    reply.code(200)

    return {
      message: `Successfully delete department with id: ${id}`,
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updateDepartmentHandler(request: FastifyRequest<{
  Params: GetDepartmentRequest,
  Body: CreateDepartmentRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {name} = request.body

    const result = await updateDepartment(id, name)
    request.log.info(result)
    reply.code(200)

    return {
      message: `Successfully updated department with id: ${id}`,
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
