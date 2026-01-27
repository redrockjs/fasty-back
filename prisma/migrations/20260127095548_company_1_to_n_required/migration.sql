/*
  Warnings:

  - Made the column `company_id` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department_id` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_company_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_department_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_position_id_fkey";

-- DropIndex
DROP INDEX "User_company_id_key";

-- DropIndex
DROP INDEX "User_department_id_key";

-- DropIndex
DROP INDEX "User_position_id_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "company_id" SET NOT NULL,
ALTER COLUMN "department_id" SET NOT NULL,
ALTER COLUMN "position_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
