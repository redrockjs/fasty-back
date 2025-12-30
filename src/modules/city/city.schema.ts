import {serverError} from "../../shared/errors/errorHandler.js";

const city = {
  id: {type: 'string'},
  name: {type: 'string'},
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