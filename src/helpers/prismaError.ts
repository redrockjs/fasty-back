import {PrismaClientKnownRequestError} from "@prisma/client/runtime/client";

export function prismaErrorLogger(error: unknown) {
  if (error instanceof PrismaClientKnownRequestError) {
    console.error('💥 PrismaClientError:', error.code, error.message)
    throw new Error(error.message);
  } else {
    console.log('❓ Error:', error)
  }
}
