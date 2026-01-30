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

const companySchema = {
  type: "object",
  required: ["name"],
  properties: {
    id: {type: "string", format: "uuid"},
    name: {type: "string", minLength: 1}
  },
  additionalProperties: false
}

export const allCompaniesSchema = {
  schema: {
    description: "Get all companies",
    tags: ["Company"],
    response: {
      200: {
        type: "array",
        items: companySchema,
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleCompanySchema = {
  schema: {
    description: "Get a single company",
    tags: ["Company"],
    response: {
      200: companySchema,
      400: clientHttpErrorSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createCompanySchema = {
  schema: {
    description: "Create company",
    tags: ["Company"],
    body: companySchema,
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deleteCompanySchema = {
  schema: {
    description: "Delete company",
    tags: ["Company"],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updateCompanySchema = {
  schema: {
    description: "Update company",
    tags: ["Company"],
    body: companySchema,
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}
