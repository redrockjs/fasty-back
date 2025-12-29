import {serverError} from "../../shared/errors/errorHandler.js";

export const allCompanies = {
  description: "Get all companies",
  tags: ["company"],
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        //properties: user,
      },
    },
    500: serverError,
  },
};