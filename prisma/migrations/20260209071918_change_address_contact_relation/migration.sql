/*
  Safe migration: Contact ↔ Address one-to-one
*/

-- 1. Удаляем FK Address → Contact
ALTER TABLE "Address"
DROP CONSTRAINT "Address_contact_id_fkey";

-- 2. Удаляем UNIQUE constraint (НЕ индекс!)
ALTER TABLE "Address"
DROP CONSTRAINT "unique_contact_address";

-- 3. Добавляем address_id в Contact (ПОКА nullable)
ALTER TABLE "Contact"
    ADD COLUMN "address_id" TEXT;

-- 4. Переносим данные (если данные есть)
UPDATE "Contact" c
SET address_id = a.id
    FROM "Address" a
WHERE a.contact_id = c.id;

-- 5. Делаем address_id обязательным
ALTER TABLE "Contact"
    ALTER COLUMN "address_id" SET NOT NULL;

-- 6. Делаем 1:1
CREATE UNIQUE INDEX "Contact_address_id_key"
    ON "Contact"("address_id");

-- 7. Добавляем FK Contact → Address
ALTER TABLE "Contact"
    ADD CONSTRAINT "Contact_address_id_fkey"
        FOREIGN KEY ("address_id")
            REFERENCES "Address"("id")
            ON DELETE RESTRICT
            ON UPDATE CASCADE;

-- 8. Удаляем старый contact_id
ALTER TABLE "Address"
DROP COLUMN "contact_id";
