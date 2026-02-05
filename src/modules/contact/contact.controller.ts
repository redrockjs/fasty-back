import {type FastifyReply, type FastifyRequest} from "fastify";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from "./contact.service.js";
import type {IContact} from "./contact.types.js";

type GetContactRequest = {
  id: string
}

type CreateContactRequest = IContact
type UpdateContactRequest = IContact

export async function getAllContactsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllContacts()
    request.log.info(result)
    reply.code(200).send(result)
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function getContactByIdHandler(request: FastifyRequest<{
  Params: GetContactRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params

    if (!id) reply.code(400).send({message: "Contact id is required"})

    const result = await getContactById(id);
    request.log.info(result)
    reply.code(200)
    return result
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function createContactHandler(request: FastifyRequest<{
  Body: CreateContactRequest
}>, reply: FastifyReply) {
  try {

    const contact = request.body
    console.log('🍒🍒🍒', contact);

    // const contact = request.body
    //const result = await createContact(contact)
    //request.log.info(result)
    reply.code(201)

    return {message: 'Successfully created contact'}
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

//[{"phone": "19991234567","type": "HOME"},{"phone": "15551112233", "type": "WORK"}]

export async function deleteContactHandler(request: FastifyRequest<{
  Params: GetContactRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteContact(id)
    request.log.info(result)
    reply.code(200)

    return {message: `Successfully delete user with id: ${id} \\n ${result}`}
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function updateContactHandler(request: FastifyRequest<{
  Params: GetContactRequest,
  Body: UpdateContactRequest
}>, reply: FastifyReply) {
  try {
    const {id: requestId} = request.params
    const contact = request.body

    const result = await updateContact({requestId, ...contact})
    request.log.info(result)
    reply.code(200)

    return {message: `Successfully updated user with id: ${requestId}`}
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
