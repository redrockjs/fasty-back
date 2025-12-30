import {serverError} from "../../shared/errors/errorHandler.js";

export const heartbeatSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      500: serverError,
    }
  }
}