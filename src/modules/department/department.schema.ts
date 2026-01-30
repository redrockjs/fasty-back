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

const departmentSchema = {
  type: "object",
  required: ["id", "name"],
  properties: {
    id: {type: "string", format: "uuid"},
    name: {type: "string", minLength: 1}
  },
  additionalProperties: false
}

export const allDepartmentsSchema = {
  schema: {
    description: "Get all departments",
    tags: ["Department"],
    response: {
      200: {
        type: "array",
        items: departmentSchema,
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleDepartmentSchema = {
  schema: {
    description: "Get a single department",
    tags: ["Department"],
    response: {
      200: departmentSchema,
      400: clientHttpErrorSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createDepartmentSchema = {
  schema: {
    description: "Create department",
    tags: ["Department"],
    body: departmentSchema,
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deleteDepartmentSchema = {
  schema: {
    description: "Delete department",
    tags: ["Department"],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updateDepartmentSchema = {
  schema: {
    description: "Update department",
    tags: ["Department"],
    body: departmentSchema,
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}