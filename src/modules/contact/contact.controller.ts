import fs from "fs";
import path from "path";
import {pipeline} from "stream/promises";
import {v4 as uuidv4} from 'uuid';

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

    const uploadDir = path.join(process.cwd(), "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, {recursive: true});
    const savedFiles: string[] = [];

    const file = files[0];
    const ext = path.extname(file.filename);
    const photo = `${uuidv4()}${ext}`;
    const filePath = path.join(uploadDir, photo);
    await pipeline(
      file.file,
      fs.createWriteStream(filePath)
    );

    savedFiles.push(photo);

    const result = await createContact({
      ...contact,
      photo
    })
    request.log.info(result)
    return reply.code(201).send({
      message: 'Successfully created contact',
      result: result,
      files: savedFiles,
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
    return reply.code(200).send({message: `Successfully delete user with id: ${id} \\n ${result}`})
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
    return reply.code(200).send({message: `Successfully updated user with id: ${requestId}`})
  } catch (error) {
    request.log.error(error);
    reply.code(500).send({message: "Something went wrong"});
  }
}
