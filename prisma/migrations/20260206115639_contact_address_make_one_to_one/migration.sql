/*
  Warnings:

  - A unique constraint covering the columns `[contact_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
DELETE FROM "Address"
WHERE id NOT IN (
    SELECT MIN(id) FROM "Address"
    GROUP BY contact_id
);

-- 2. Создаём уникальный индекс на contact_id
ALTER TABLE "Address"
ADD CONSTRAINT unique_contact_address UNIQUE (contact_id);

-- CreateIndex
CREATE UNIQUE INDEX "Address_contact_id_key" ON "Address"("contact_id");
