/*
  Warnings:

  - You are about to drop the column `user_id` on the `Address` table. All the data in the column will be lost.
  - Added the required column `contact_id` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- Переименовываем колонку
ALTER TABLE "Address"
RENAME COLUMN "user_id" TO "contact_id";

-- Переименовываем foreign key constraint
ALTER TABLE "Address"
RENAME CONSTRAINT "Address_user_id_fkey" TO "Address_contact_id_fkey";
