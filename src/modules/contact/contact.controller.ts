import {type FastifyReply, type FastifyRequest} from "fastify";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
} from "./contact.service.js";
import type {IContact} from "./contact.types.js";
import deleteFileIfExists from "../../helpers/deleteFileIfExists.js";
import {uploadFile} from "../../helpers/uploadFile.js";
import type {MultipartFile} from "@fastify/multipart";

type GetContactRequest = {
  id: string
}
type CreateContactRequest = IContact
type UpdateContactRequest = IContact

export async function getAllContactsHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    const result = await getAllContacts()
    request.log.info(result)
    return reply.code(200).send(result)
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
    return reply.code(200).send(result)
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
    const files = request.filesData ?? []

    const {uploadedFile} = await uploadFile({file: files[0]})

    const result = await createContact({
      ...contact,
      photo: uploadedFile
    })
    request.log.info(result)
    return reply.code(201).send({
      message: 'Successfully created contact',
      result: result,
      file: uploadedFile,
    })
  } catch
    (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}

export async function deleteContactHandler(request: FastifyRequest<{
  Params: GetContactRequest
}>, reply: FastifyReply) {
  try {
    const {id} = request.params
    const result = await deleteContact(id)
    request.log.info(result)
    return reply.code(200).send({
      message: `Successfully delete user with id: ${id}`,
      result: result,
    })
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
    const {id} = request.params
    const contact = request.body

    const prevContact = await getContactById(id);
    const prevPhoto = prevContact?.photo ?? null;

    const files = request.filesData ?? []
    const file: MultipartFile | null = (files[0] && files[0].filename) ? files[0] : null;

    let result;

    if (file) {
      const {uploadedFile} = await uploadFile({file})

      if (prevPhoto) await deleteFileIfExists({file:prevPhoto})

      result = await updateContact({
        requestId: id,
        ...contact,
        photo: uploadedFile
      })
    } else {
      if (prevPhoto) await deleteFileIfExists({file:prevPhoto})
      result = await updateContact({
        requestId: id,
        ...contact,
        photo: prevPhoto ? prevPhoto : null
      })
    }

    request.log.info(result)
    return reply.code(200).send({
      message: `Successfully updated user with id: ${id}`,
      result: result,
      file: file ? uploadFile : null,
    })
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
