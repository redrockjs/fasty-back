import {type FastifyReply, type FastifyRequest} from "fastify";
import {getAllPositions, getPositionById, createPosition, deletePosition, updatePosition} from "./position.service.js";
import {request} from "node:http";

type GetPositionRequest = {
  id: string
}

type CreatePositionRequest = {
  name: string
}

export async function getAllPositionsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllPositions()
    request.log.info(result)
    reply.code(200).send(result)
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getPositionByIdHandler(request: FastifyRequest<{ Params: GetPositionRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params

    //if (!id) reply.code(400).send({message: "City id is required"})

    const result = await getPositionById(id);
    request.log.info(result)
    reply.code(200)
    return result
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createPositionHandler(request: FastifyRequest<{ Body: CreatePositionRequest }>, reply: FastifyReply) {
  try {
    const {name} = request.body
    const result = await createPosition(name)
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

export async function deletePositionHandler(request: FastifyRequest<{ Params: GetPositionRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deletePosition(id)
    request.log.info(result)
    reply.code(200)

    return {
      message: `Successfully delete city with id: ${id}`,
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updatePositionHandler(request: FastifyRequest<{
  Params: GetPositionRequest,
  Body: CreatePositionRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {name} = request.body

    const result = await updatePosition(id, name)
    request.log.info(result)
    reply.code(200)

    return {
      message: `Successfully updated city with id: ${id}`,
      result: result
    }
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
