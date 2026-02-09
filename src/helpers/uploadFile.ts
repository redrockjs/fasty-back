import type {MultipartFile} from "@fastify/multipart";

import fs from "fs";
import path from "path";
import {pipeline} from "stream/promises";
import {v4 as uuidv4} from 'uuid';


type UploadFile = {
  uploadDir?: string;
  file: MultipartFile
}

export async function uploadFile({file, uploadDir}: UploadFile): Promise<{ uploadedFile: string | null }> {
  const uploadDirPath = uploadDir ?? path.join(process.cwd(), "uploads/");
  if (!file) return {uploadedFile: null};
  if (!fs.existsSync(uploadDirPath)) fs.mkdirSync(uploadDirPath, {recursive: true});

  const ext = path.extname(file.filename);
  const target = `${uuidv4()}${ext}`;
  const filePath = path.join(uploadDirPath, target);

  try {
    await pipeline(
      file.file,
      fs.createWriteStream(filePath)
    );
    return {
      uploadedFile: target
    }
  } catch (e) {
    throw e
  }
}