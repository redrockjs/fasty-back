import type {FastifyRequest} from "fastify";
import type {MultipartFile} from "@fastify/multipart";

export interface ParsedMultipart<T> {
  payload: T | null;
  files: MultipartFile[];
  fields: Record<string, string>;
}

/**
 * HELPER parseMultipart<T>()
 * use DTO as generic type T
 * Use this function when you need to extract multipart form-data in controller
 *
 * @param request
 */
export async function parseMultipart<T>(request: FastifyRequest): Promise<ParsedMultipart<T>> {
  const parts = request.parts();

  let payload: T | null = null;
  const files: MultipartFile[] = [];
  const fields: Record<string, string> = {};

  for await (const part of parts) {
    if (part.type === "file") {
      files.push(part);
      continue;
    }

    // text field
    if (part.type === "field") {
      if (part.fieldname === "payload") {
        payload = JSON.parse(<string>part.value);
      } else {
        fields[part.fieldname] = <string>part.value;
      }
    }
  }

  return {
    payload,
    files,
    fields
  };
}