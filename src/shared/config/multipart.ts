import type {FastifyMultipartBaseOptions} from "@fastify/multipart";

export const multipartConfig: FastifyMultipartBaseOptions = {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  }
}
