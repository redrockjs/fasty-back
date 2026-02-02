import type {FastifyInstance} from "fastify";

import {
  getAllContactsHandler,
  getContactByIdHandler,
  createContactHandler,
  deleteContactHandler,
  updateContactHandler
} from './contact.controller.js'
import {
  allContactsSchema,
  createContactSchema,
  deleteContactSchema,
  singleContactSchema,
  updateContactSchema
} from "./contact.schema.js";

async function contactRoutes(fastify: FastifyInstance) {
  fastify.get('/', allContactsSchema, getAllContactsHandler)
  fastify.get('/:id', singleContactSchema, getContactByIdHandler)
  fastify.post('/', createContactSchema, createContactHandler)
  fastify.delete('/:id', deleteContactSchema, deleteContactHandler)
  fastify.put('/:id', updateContactSchema, updateContactHandler)
}

export default contactRoutes