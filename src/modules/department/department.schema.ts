import {serverError} from "../../shared/errors/errorHandler.js";

const department = {
  id: {type: 'string'},
  name: {type: 'string'},
}

export const allDepartmentsSchema = {
  schema: {
    description: "Get all departments",
    tags: ['department'],
    response: {
      200: {
        type: "array",
        items: {
          type: 'object',
          properties: department
        }
      },
      500: serverError
    }
  }
}

export const singleDepartmentSchema = {
  schema: {
    description: "Get a single department",
    tags: ["department"],
    params: {
      type: "object",
      properties: {
        id: {type: 'string'},
      },
      required: ["id"]
    },
    response: {
      200: {
        name: {type: 'string'},
      },
      404: {
        type: 'object',
        properties: {
          message: {type: 'string'},
        }
      },
      500: serverError,
    }
  }
}

export const createDepartmentSchema = {
  schema: {
    description: "Create department",
    tags: ['department'],
    required: ['name'],
    additionalProperties: false,
    type: 'object',
    body: {
      properties: {
        name: {type: 'string'},
      }
    },
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          result: {
            id: {type: 'string'},
            name: {type: 'string'},
          }
        }
      }
    }
  }
}

export const deleteDepartmentSchema = {
  schema: {
    description: "Delete department",
    tags: ['department'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          result: {
            id: {type: 'string'},
            name: {type: 'string'},
          }
        }
      }
    }
  }
}

export const updateDepartmentSchema = {
  schema: {
    description: "Update department",
    tags: ['department'],
    required: ['name'],
    additionalProperties: false,
    type: 'object',
    body: {
      properties: {
        name: {type: 'string'},
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
          result: {
            id: {type: 'string'},
            name: {type: 'string'},
          }
        }
      }
    }
  }
}