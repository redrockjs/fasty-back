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

export const loginUserSchema = {
  schema: {
    description: "Login user",
    tags: ["Auth"],
    body: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {type: "string", format: "email"},
        password: {type: "string", minLength: 8, maxLength: 24},
      },
      additionalProperties: false
    },
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const refreshTokenSchema = {
  schema: {
    description: "Refresh access token",
    tags: ["Auth"],
    body: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: {type: "string"},
      },
      additionalProperties: false
    },
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const logoutUserSchema = {
  schema: {
    description: "Logout user",
    tags: ["Auth"],
    body: {
      type: "object",
      required: ["refreshToken"],
      properties: {
        refreshToken: {type: "string"},
      },
      additionalProperties: false
    },
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const createUserSchema = {
  schema: {
    description: "Create user",
    tags: ["Auth"],
    body: {
      type: "object",
      required: ["firstName", "lastName", "email", "password"],
      properties: {
        firstName: {type: "string", minLength: 2},
        lastName: {type: "string", minLength: 2},
        email: {type: "string", format: "email"},
        password: {type: "string", minLength: 8, maxLength: 24},
      },
      additionalProperties: false
    },
    response: {
      201: serverHttpAcceptSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const updatePasswordSchema = {
  schema: {
    description: "Update user password",
    tags: ["Auth"],
    body: {
      type: "object",
      required: ["password"],
      properties: {
        password: {type: "string", minLength: 8, maxLength: 24},
        oldPassword: {type: "string", minLength: 8, maxLength: 24},
      },
      additionalProperties: false
    },
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}

export const deleteUserSchema = {
  schema: {
    description: "Delete user",
    tags: ["Auth"],
    response: {
      200: serverHttpAcceptSchema,
      404: clientHttpErrorSchema,
      500: serverHttpErrorSchema,
    }
  }
}