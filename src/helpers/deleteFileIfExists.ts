import fs from "fs/promises"
import path from "path";

interface FileSystemError extends Error {
  code?: string;
  errno?: number;
  syscall?: string;
  path?: string;
}

function isFileSystemError(error: unknown): error is FileSystemError {
  return error instanceof Error && 'code' in error;
}

type DeleteFile = {
  uploadDir?: string;
  file: string
}

async function deleteFileIfExists({file, uploadDir}: DeleteFile): Promise<boolean> {
  const uploadDirPath = uploadDir ?? path.join(process.cwd(), "uploads/");
  try {
    await fs.access(uploadDirPath + file); // Проверяем существование файла
    await fs.unlink(uploadDirPath + file); // Удаляем файл

    //console.log(`Файл ${file} успешно удален`);
    return true;
  } catch (error) {
    if (isFileSystemError(error) && (error.code === 'ENOENT')) {
      console.log(`Файл ${file} не существует`);
      return false;
    } else {
      console.error(`Ошибка при удалении файла ${file}:`, error);
      throw error;
    }
  }
}

export default deleteFileIfExists;