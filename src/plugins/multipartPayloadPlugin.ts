import fp from "fastify-plugin";
import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import type {MultipartFile} from "@fastify/multipart";

/**
 * multipartPayloadPlugin - A plugin for retrieving data from a multipart form-data.
 * Handles two data retrieval schemes:
 * 1. Payload field with JSON + Files array
 *    multipart
 *     ├ payload -> JSON (parse JSON needed)
 *     ├ files -> files
 * 2. Form fields with injecting to body + Files array
 *    multipart
 *     ├ field1 -> string
 *     ├ field2 -> string
 *     ├ field3 -> string (parse JSON needed if JSON-data inside)
 *     ├ files -> files
 * (!) Depending on the method, it is necessary to validate the validation scheme differently
 * @param fastify
 */
async function multipartPayloadPlugin(fastify: FastifyInstance) {

  async function multipartProcessing(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    if (!request.isMultipart()) return;

    const parts = request.parts();

    let payload: unknown = null;
    const files: MultipartFile[] = [];
    const fields: Record<string, string> = {};

    for await (const part of parts) {
      if (part.type === "file") {
        files.push(part);
        continue;
      }

      if (part.fieldname === "payload") {
        try {
          payload = JSON.parse(<string>part.value);
        } catch {
          return reply.code(400).send({
            message: "Invalid JSON in payload"
          });
        }
      } else {
        fields[part.fieldname] = <string>part.value;
      }
    }

    // inject into request
    request.body = payload ?? {}; // used for AJV validation
    request.filesData = files;        // add files array to request or use request.parts()
    request.fieldsData = fields;      // add fields array to request or use request.parts()
  }

  fastify.addHook("preValidation", multipartProcessing)
}

export default fp(multipartPayloadPlugin);