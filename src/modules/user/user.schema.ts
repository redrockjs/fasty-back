import {clientHttpErrorSchema, serverHttpErrorSchema} from "../../shared/errors/errorHandler.js";

const serverHttpAcceptSchema = {
  type: 'object',
  properties: {
    message: {type: 'string'},
    result: {
      id: {type: 'string'},
      name: {type: 'string'},
    }
  }
}

const userSchema = {
  type: 'object',
  required: [
    'firstName',
    'lastName',
    'email',
    'company',
    'department',
    'position',
    'addresses',
    'phones'
  ],
  properties: {
    firstName: {type: 'string', minLength: 2},
    midName: {type: 'string'},
    lastName: {type: 'string', minLength: 2},
    email: {type: 'string', format: 'email'},
    company: {type: 'string', minLength: 2},
    department: {type: 'string', minLength: 2},
    position: {type: 'string', minLength: 2},
    addresses: {
      type: 'object',
      required: ['region', 'city', 'street', 'building', 'apartment'],
      properties: {
        region: {type: 'string', minLength: 1},
        city: {type: 'string', minLength: 1},
        street: {type: 'string', minLength: 1},
        building: {type: 'number', minLength: 1},
        apartment: {type: 'number', minLength: 1}
      },
      additionalProperties: false
    },
    phones: {
      type: 'array',
      items: {
        type: 'object',
        required: ['number', 'type'],
        properties: {
          number: {type: 'string', pattern: '^[0-9]+$'}, // только цифры
          type: {type: 'string', enum: ['HOME', 'WORK', 'MOBILE']}
        },
        additionalProperties: false
      }
    }
  },
  additionalProperties: false
}

export const allUsersSchema = {
  schema: {
    description: "Get all users",
    tags: ['User'],
    response: {
      200: {
        type: 'array',
        items: userSchema,
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleUserSchema = {
  schema: {
    description: "Get a single user",
    tags: ['User'],
    response: {
      200: userSchema,
      400: clientHttpErrorSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createUserSchema = {
  schema: {
    description: "Create user",
    tags: ['User'],
    body: userSchema,
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deleteUserSchema = {
  schema: {
    description: "Delete user",
    tags: ['User'],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updateUserSchema = {
  schema: {
    description: "Update user",
    tags: ['User'],
    body: userSchema,
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}