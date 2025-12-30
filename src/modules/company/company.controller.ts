import {type FastifyReply, type FastifyRequest} from "fastify";
import {
  getAllCompanies,
  getCompanyById,
  createCompany,
  deleteCompany,
  updateCompany
} from "./company.service.js";

type GetCompanyRequest = {
  id: string
}

type CreateCompanyRequest = {
  name: string
}

export async function getAllCompaniesHandler(_: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllCompanies()
    reply.code(200).send(result)
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getCompanyByIdHandler(request: FastifyRequest<{
  Params: GetCompanyRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params

    //if (!id) reply.code(400).send({message: "City id is required"})

    const result = await getCompanyById(id);

    reply.code(200)
    return result
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createCompanyHandler(request: FastifyRequest<{
  Body: CreateCompanyRequest
}>, reply: FastifyReply) {
  try {
    const {name} = request.body
    const result = await createCompany(name)
    reply.code(201)

    return {
      message: 'Successfully created company',
      result: result
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteCompanyHandler(request: FastifyRequest<{
  Params: GetCompanyRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteCompany(id)
    reply.code(200)

    return {
      message: `Successfully delete company with id: ${id}`,
      result: result
    }
  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updateCompanyHandler(request: FastifyRequest<{
  Params: GetCompanyRequest,
  Body: CreateCompanyRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const {name} = request.body

    const result = await updateCompany(id, name)

    reply.code(200)

    return {
      message: `Successfully updated company with id: ${id}`,
      result: result
    }

  } catch (error) {
    console.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
