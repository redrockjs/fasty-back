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

export const allCitiesSchema = {
  schema: {
    description: "Get all cities",
    tags: ['User'],
    response: {
      200: {
        type: "array",
        items: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            id: {type: 'string', format: 'uuid'},
            name: {type: 'string', minLength: 1}
          }
        }
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleCitySchema = {
  schema: {
    description: "Get a single city",
    tags: ['User'],
    response: {
      200: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: {type: 'string', format: 'uuid'},
          name: {type: 'string', minLength: 1}
        },
        additionalProperties: false
      },
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createCitySchema = {
  schema: {
    description: "Create city",
    tags: ['User'],
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {type: 'string', minLength: 2},
      },
      additionalProperties: false
    },
    response: {
      201: serverHttpAcceptSchema
    }
  }
}

export const deleteCitySchema = {
  schema: {
    description: "Delete city",
    tags: ['User'],
    response: {
      200: serverHttpAcceptSchema
    }
  }
}

export const updateCitySchema = {
  schema: {
    description: "Update city",
    tags: ['User'],
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: {type: 'string', minLength: 2},
      },
      additionalProperties: false
    },
    response: {
      200: serverHttpAcceptSchema
    }
  }
}