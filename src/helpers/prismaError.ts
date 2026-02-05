import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";

export function prismaErrorLogger(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    console.error('🍒', error.code, error.message)
    throw new Error(error.message);
  } else {
    console.log('🍒', error)
  }
}
