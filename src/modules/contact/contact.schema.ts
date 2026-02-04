import {clientHttpErrorSchema, serverHttpErrorSchema} from "../../shared/errors/errorHandler.js";

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
      type: "object",
      required: ["region", "city", "street", "building", "apartment"],
      properties: {
        region: {type: "string", minLength: 1},
        city: {type: "string", minLength: 1},
        street: {type: "string", minLength: 1},
        building: {type: "number"},
        apartment: {type: "number"}
      },
      additionalProperties: false
    },
    phones: {
      type: "array",
      items: {
        type: "object",
        required: ["number", "type"],
        properties: {
          number: {type: "string", pattern: "^\\+?[0-9]{10,15}$"}, // только цифры
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
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleContactSchema = {
  schema: {
    description: "Get a single contact",
    tags: ["Contact"],
    response: {
      200: contactSchema,
      400: clientHttpErrorSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createContactSchema = {
  schema: {
    description: "Create contact",
    tags: ["Contact"],
    body: contactSchema,
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updateContactSchema = {
  schema: {
    description: "Update contact",
    tags: ["Contact"],
    body: contactSchema,
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deleteContactSchema = {
  schema: {
    description: "Delete contact",
    tags: ["Contact"],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}