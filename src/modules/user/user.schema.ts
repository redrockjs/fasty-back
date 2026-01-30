import {serverHttpErrorSchema} from "../../shared/errors/errorHandler.js";
import {companySchema} from "../company/company.schema.js";
import {departmentSchema} from "../department/department.schema.js";
import {positionSchema} from "../position/position.schema.js";

const userSchema = {
  id: {type: 'string'},
  firstName: {type: 'string'},
  midName: {type: 'string'},
  lastName: {type: 'string'},
  email: {
    type: 'string',
    format: "email"
  },
  company: {type: 'string'},
  department: {type: 'string'},
  position: {type: 'string'},
  addresses: {},
  phones: {
    // type: "object",
    // properties: {
    //   create: {
    //     type: "array",
    //     items: {
    //       type: "object",
    //       properties: {
    //         number: {
    //           type: "string",
    //           pattern: "^[0-9]{10,15}$"
    //         },
    //         type: {
    //           type: "string",
    //         }
    //       },
    //     }
    //   }
    // }
  }
}

export const allUsersSchema = {
  schema: {
    description: "Get all users",
    tags: ['user'],
    response: {
      200: {
        //type: "array",
        // items: {
        //   type: 'object',
        //   properties: userSchema
        // }
      },
      500: serverHttpErrorSchema
    }
  }
}

export const singleUserSchema = {
  schema: {
    description: "Get a single user",
    tags: ["user"],
    params: {
      type: "object",
      properties: {
        id: {type: 'string'},
      },
      required: ["id"]
    },
    response: {
      200: {
        //properties: userSchema
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

export const createUserSchema = {
  schema: {
    description: "Create user",
    tags: ['user'],
    type: 'object',
    body: {
      properties: userSchema
    },
    response: {
      201: {
        type: 'object',
        properties: {
          message: {type: 'string'},
          result: userSchema
        }
      }
    }
  }
}

export const deleteUserSchema = {
  schema: {
    description: "Delete user",
    tags: ['user'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: {type: 'string'},
          result: userSchema
        }
      }
    }
  }
}

export const updateUserSchema = {
  schema: {
    description: "Update user",
    tags: ['user'],
    // type: 'object',
    // body: {
    //   properties: userSchema
    // },
    // response: {
    //   200: {
    //     type: 'object',
    //     properties: {
    //       message: { type: 'string' },
    //       result: userSchema
    //     }
    //   }
    // }
  }
}