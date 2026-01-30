import {serverHttpErrorSchema} from "../../shared/errors/errorHandler.js";

export const companySchema = {
  id: {type: 'string'},
  name: {type: 'string'},
}

export const allCompaniesSchema = {
  schema: {
    description: "Get all companies",
    tags: ['company'],
    response: {
      200: {
        type: "array",
        items: {
          type: 'object',
          properties: companySchema
        }
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleCompanySchema = {
  schema: {
    description: "Get a single company",
    tags: ["company"],
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
      500: serverHttpErrorSchema,
    }
  }
}

export const createCompanySchema = {
  schema: {
    description: "Create company",
    tags: ['company'],
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

export const deleteCompanySchema = {
  schema: {
    description: "Delete company",
    tags: ['company'],
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

export const updateCompanySchema = {
  schema: {
    description: "Update company",
    tags: ['company'],
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
