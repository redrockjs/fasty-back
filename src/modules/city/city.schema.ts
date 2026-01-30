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

const citySchema = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {type: "string", format: "uuid"},
    name: {type: "string", minLength: 1}
  },
  additionalProperties: false
}

export const allCitiesSchema = {
  schema: {
    description: "Get all cities",
    tags: ["City"],
    response: {
      200: {
        type: "array",
        items: citySchema,
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleCitySchema = {
  schema: {
    description: "Get a single city",
    tags: ["City"],
    response: {
      200: citySchema,
      400: clientHttpErrorSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createCitySchema = {
  schema: {
    description: "Create city",
    tags: ["City"],
    body: citySchema,
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deleteCitySchema = {
  schema: {
    description: "Delete city",
    tags: ["City"],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updateCitySchema = {
  schema: {
    description: "Update city",
    tags: ["City"],
    body: citySchema,
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}