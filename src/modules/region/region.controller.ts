import {type FastifyReply, type FastifyRequest} from "fastify";
import {createRegion, deleteRegion, getAllRegions, getRegionById, updateRegion} from "./region.service.js";

type GetRegionRequest = {
  id: string
}

type CreateRegionRequest = {
  name: string
}

export async function getAllRegionsHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllRegions()
    reply.code(200).send(result)
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getRegionByIdHandler(request: FastifyRequest<{ Params: GetRegionRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params

    //if (!id) reply.code(400).send({message: "City id is required"})

    const result = await getRegionById(id)

    reply.code(200)
    return result
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createRegionHandler(request: FastifyRequest<{ Body: CreateRegionRequest }>, reply: FastifyReply) {
  try {
    const {name} = request.body
    const result = await createRegion(name)
    reply.code(201)

    return {
      message: 'Successfully created region',
      result: result
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteRegionHandler(request: FastifyRequest<{ Params: GetRegionRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteRegion(id)
    reply.code(200)

    return {
      message: `Successfully delete region with id: ${id}`,
      result: result
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updateRegionHandler(request: FastifyRequest<{
  Params: GetRegionRequest,
  Body: CreateRegionRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {name} = request.body

    const result = await updateRegion(id, name)

    reply.code(200)

    return {
      message: `Successfully updated region with id: ${id}`,
      result: result
    }

  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
