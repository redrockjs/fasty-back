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

const regionSchema = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {type: "string", format: "uuid"},
    name: {type: "string", minLength: 1}
  },
  additionalProperties: false
}

export const allRegionsSchema = {
  schema: {
    description: "Get all regions",
    tags: ["Region"],
    response: {
      200: {
        type: "array",
        items: regionSchema,
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleRegionSchema = {
  schema: {
    description: "Get a single region",
    tags: ["Region"],
    response: {
      200: regionSchema,
      400: clientHttpErrorSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createRegionSchema = {
  schema: {
    description: "Create region",
    tags: ["Region"],
    body: regionSchema,
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deleteRegionSchema = {
  schema: {
    description: "Delete region",
    tags: ["Region"],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updateRegionSchema = {
  schema: {
    description: "Update region",
    tags: ["Region"],
    body: regionSchema,
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}