import {type FastifyReply, type FastifyRequest} from "fastify";
import {createCity, deleteCity, getAllCities, getCityById, updateCity} from "./city.service.js";

type GetCityRequest = {
  id: string
}

type CreateCityRequest = {
  name: string
}

export async function getAllCitiesHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllCities()
    request.log.info(result);
    reply.code(200).send(result)
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getCityByIdHandler(request: FastifyRequest<{ Params: GetCityRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params

    //if (!id) reply.code(400).send({message: "City id is required"})

    const result = await getCityById(id);
    request.log.info(result);
    reply.code(200)
    return result
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createCityHandler(request: FastifyRequest<{ Body: CreateCityRequest }>, reply: FastifyReply) {
  try {
    const {name} = request.body
    const result = await createCity(name)
    request.log.info(result);
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

export async function deleteCityHandler(request: FastifyRequest<{ Params: GetCityRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteCity(id)
    request.log.info(result);
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

export async function updateCityHandler(request: FastifyRequest<{
  Params: GetCityRequest,
  Body: CreateCityRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {name} = request.body

    const result = await updateCity(id, name)
    request.log.info(result);
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
