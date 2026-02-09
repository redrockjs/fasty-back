-- DropIndex
DROP INDEX "Contact_email_key";

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "email" DROP NOT NULL;
