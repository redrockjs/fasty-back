import {serverHttpErrorSchema} from "../../shared/errors/errorHandler.js";

export const heartbeatSchema = {
  schema: {
    description: "Get a server heartbeat",
    tags: ['Heartbeat'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      500: serverHttpErrorSchema,
    }
  }
}