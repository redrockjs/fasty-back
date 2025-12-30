import {serverError} from "../../shared/errors/errorHandler.js";

const region = {
  id: {type: 'string'},
  name: {type: 'string'},
}

export const allRegionsSchema = {
  schema: {
    description: "Get all regions",
    tags: ['region'],
    response: {
      200: {
        type: "array",
        items: {
          type: 'object',
          properties: region
        }
      },
      500: serverError
    }
  }
}

export const singleRegionSchema = {
  schema: {
    description: "Get a single region",
    tags: ["region"],
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

export const createRegionSchema = {
  schema: {
    description: "Create region",
    tags: ['region'],
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

export const deleteRegionSchema = {
  schema: {
    description: "Delete region",
    tags: ['region'],
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

export const updateRegionSchema = {
  schema: {
    description: "Update region",
    tags: ['region'],
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