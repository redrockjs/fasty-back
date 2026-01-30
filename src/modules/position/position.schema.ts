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

const positionSchema = {
  type: 'object',
  required: ['id', 'name'],
  properties: {
    id: {type: 'string', format: 'uuid'},
    name: {type: 'string', minLength: 1}
  },
  additionalProperties: false
}

export const allPositionsSchema = {
  schema: {
    description: "Get all positions",
    tags: ['Position'],
    response: {
      200: {
        type: "array",
        items: positionSchema,
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singlePositionSchema = {
  schema: {
    description: "Get a single position",
    tags: ["Position"],
    response: {
      200: positionSchema,
      400: clientHttpErrorSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createPositionSchema = {
  schema: {
    description: "Create position",
    tags: ['Position'],
    body: positionSchema,
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deletePositionSchema = {
  schema: {
    description: "Delete position",
    tags: ['Position'],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updatePositionSchema = {
  schema: {
    description: "Update position",
    tags: ['Position'],
    body: positionSchema,
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}