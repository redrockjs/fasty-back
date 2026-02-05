import { type FastifySchema } from 'fastify'

const serverHttpAcceptSchema = {
  type: "object",
  properties: {
    message: {type: "string"},
    result: {
      id: {type: "string"},
      name: {type: "string"},
    }
  }
}

const contactSchema = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "email",
    "company",
    "department",
    "position",
    "addresses",
    "phones"
  ],
  properties: {
    firstName: {type: "string", minLength: 2},
    midName: {type: "string"},
    lastName: {type: "string", minLength: 2},
    email: {type: "string", format: "email"},
    company: {type: "string", minLength: 2},
    department: {type: "string", minLength: 2},
    position: {type: "string", minLength: 2},
    addresses: {
      type: "array",
      items: {
        required: ["region", "city", "street", "building", "apartment"],
        properties: {
          region: {type: "string", minLength: 1},
          city: {type: "string", minLength: 1},
          street: {type: "string", minLength: 1},
          building: {type: "number"},
          apartment: {type: "number"}
        },
      },
      additionalProperties: false
    },
    phones: {
      type: "array",
      items: {
        type: "object",
        required: ["phone", "type"],
        properties: {
          phone: {type: "string", pattern: "^\\+?[0-9]{10,15}$"}, // только цифры
          type: {type: "string", enum: ["HOME", "WORK", "MOBILE"]}
        },
        additionalProperties: false
      }
    }
  },
  additionalProperties: false
}

export const allContactsSchema = {
  schema: {
    description: "Get all contacts",
    tags: ["Contact"],
    response: {
      200: {
        type: "array",
        items: contactSchema,
      }
    }
  }
} satisfies { schema: FastifySchema }

export const singleContactSchema = {
  schema: {
    description: "Get a single contact",
    tags: ["Contact"],
    response: {
      200: contactSchema,
    }
  }
} satisfies { schema: FastifySchema }

export const createContactSchema = {
  schema: {
    description: "Create contact",
    tags: ["Contact"],
    body: contactSchema,
    response: {
      201: serverHttpAcceptSchema,
    }
  }
} satisfies { schema: FastifySchema }

export const updateContactSchema = {
  schema: {
    description: "Update contact",
    tags: ["Contact"],
    body: contactSchema,
    response: {
      200: serverHttpAcceptSchema,
    }
  }
} satisfies { schema: FastifySchema }

export const deleteContactSchema = {
  schema: {
    description: "Delete contact",
    tags: ["Contact"],
    response: {
      200: serverHttpAcceptSchema,
    }
  }
} satisfies { schema: FastifySchema }