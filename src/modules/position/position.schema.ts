import {serverError} from "../../shared/errors/errorHandler.js";

const position = {
  id: {type: 'string'},
  name: {type: 'string'},
}

export const allPositionsSchema = {
  schema: {
    description: "Get all positions",
    tags: ['position'],
    response: {
      200: {
        type: "array",
        items: {
          type: 'object',
          properties: position
        }
      },
      500: serverError
    }
  }
}

export const singlePositionSchema = {
  schema: {
    description: "Get a single position",
    tags: ["position"],
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

export const createPositionSchema = {
  schema: {
    description: "Create position",
    tags: ['position'],
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

export const deletePositionSchema = {
  schema: {
    description: "Delete position",
    tags: ['position'],
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

export const updatePositionSchema = {
  schema: {
    description: "Update position",
    tags: ['position'],
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