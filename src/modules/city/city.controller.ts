import {type FastifyReply, type FastifyRequest} from "fastify";
import {getAllCities, getCityById} from "./city.service.js";

type GetCityRequest = {
  id: string
}

export async function getAllCitiesHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllCities()
    reply.code(200).send(result)
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getCityByIdHandler(request: FastifyRequest<{ Params: GetCityRequest }>, reply: FastifyReply) {
  try {
    const {id} = request.params

    //if (!id) reply.code(400).send({message: "City id is required"})

    const result = await getCityById(id);

    reply.code(200).send(result);
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}


