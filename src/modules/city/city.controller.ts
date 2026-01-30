import {type FastifyReply, type FastifyRequest} from "fastify";
import {createCity, deleteCity, getAllCities, getCityById, updateCity} from "./city.service.js";

type GetCityRequest = {
  id: string
}

type CreateCityRequest = {
  name: string
}

type DeleteCityRequest = GetCityRequest
type UpdateCityRequestParams = GetCityRequest

type UpdateCityRequestBody = CreateCityRequest

export async function getAllCitiesHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllCities()
    return reply.code(200).send(result)
  } catch (error) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getCityByIdHandler(request: FastifyRequest<{ Params: GetCityRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params
    if (!id) {
      return reply.code(400).send({message: "City id is required"})
    }

    const result = await getCityById(id);

    if (!result) {
      return reply.status(404).send({message: 'City not found'});
    }

    return reply.code(200).send(result)
  } catch (error) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createCityHandler(request: FastifyRequest<{ Body: CreateCityRequest }>, reply: FastifyReply) {
  try {
    const {name} = request.body
    const result = await createCity(name)
    return reply.code(201).send({
      message: 'Successfully created city',
      result: result
    })
  } catch (error) {
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteCityHandler(request: FastifyRequest<{ Params: DeleteCityRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteCity(id)

    if (!result) {
      return reply.status(404).send({message: 'City not found'});
    }

    return reply.code(200).send({
      message: `Successfully delete city with id: ${id}`,
      result: result
    })
  } catch (error) {
    request.log.error(error)
    if (error instanceof Error && error.message === 'City not found') {
      return reply.code(404).send({message: error.message});
    }
    return reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updateCityHandler(request: FastifyRequest<{
  Params: UpdateCityRequestParams,
  Body: UpdateCityRequestBody
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {name} = request.body
    const result = await updateCity(id, name)

    return reply.code(200).send({
      message: `Successfully updated city with id: ${id}`,
      result: result
    })
  } catch (error) {
    request.log.error(error)
    if (error instanceof Error && error.message === 'City not found') {
      return reply.code(404).send({message: error.message});
    }
    return reply.code(500).send({message: "Something went wrong"});
  }
}
