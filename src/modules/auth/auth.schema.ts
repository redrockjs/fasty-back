import { type FastifySchema } from 'fastify'

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
    }
  }
} satisfies { schema: FastifySchema }

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
    }
  }
} satisfies { schema: FastifySchema }

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
    }
  }
} satisfies { schema: FastifySchema }

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
        role: {type: "string", enum: ["ADMIN", "USER"]},
      },
      additionalProperties: false
    },
  }
} satisfies { schema: FastifySchema }

export const updatePasswordSchema = {
  schema: {
    description: "Update user password",
    tags: ["Auth"],
    body: {
      type: "object",
      required: ["oldPassword", "password"],
      properties: {
        oldPassword: {type: "string", minLength: 8, maxLength: 24},
        password: {type: "string", minLength: 8, maxLength: 24},
      },
      additionalProperties: false
    }
  }
} satisfies { schema: FastifySchema }

export const deleteUserSchema = {
  schema: {
    description: "Delete user",
    tags: ["Auth"]
  }
} satisfies { schema: FastifySchema }

export const getUserInfoSchema = {
  schema: {
    description: "Get user information",
    tags: ["Auth"]
  }
} satisfies { schema: FastifySchema }