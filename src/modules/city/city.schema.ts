import {serverError} from "../../shared/errors/errorHandler.js";

const city = {
  id: {type: 'string'},
  name: {type: 'string'},
}

export const allCitySchema = {
  schema: {
    description: "Get all cities",
    tags: ['city'],
    response: {
      200: {
        type: "array",
        items: {
          type: 'object',
          properties: city
        }
      },
      500: serverError
    }
  }
}

export const singleCitySchema = {
  schema: {
    description: "Get a single city",
    tags: ["city"],
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

export const createCitySchema = {
  schema: {
    description: "Create city",
    tags: ['city'],
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

export const deleteCitySchema = {
  schema: {
    description: "Delete city",
    tags: ['city'],
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

export const updateCitySchema = {
  schema: {
    description: "Update city",
    tags: ['city'],
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