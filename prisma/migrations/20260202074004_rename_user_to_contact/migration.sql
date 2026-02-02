/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Phones" DROP CONSTRAINT "Phones_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_company_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_department_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_position_id_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "midName" TEXT,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "department_id" TEXT NOT NULL,
    "position_id" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "Positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
