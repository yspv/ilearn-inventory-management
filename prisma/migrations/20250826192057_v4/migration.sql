/*
  Warnings:

  - You are about to drop the column `templateId` on the `inventory_field` table. All the data in the column will be lost.
  - You are about to drop the column `template_id` on the `inventory_item` table. All the data in the column will be lost.
  - You are about to drop the `inventory_template` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inventoryId` to the `inventory_field` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."inventory_field" DROP CONSTRAINT "inventory_field_templateId_fkey";

-- DropForeignKey
ALTER TABLE "public"."inventory_item" DROP CONSTRAINT "inventory_item_template_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."inventory_template" DROP CONSTRAINT "inventory_template_inventory_id_fkey";

-- AlterTable
ALTER TABLE "public"."inventory_field" DROP COLUMN "templateId",
ADD COLUMN     "inventoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."inventory_item" DROP COLUMN "template_id";

-- DropTable
DROP TABLE "public"."inventory_template";

-- AddForeignKey
ALTER TABLE "public"."inventory_field" ADD CONSTRAINT "inventory_field_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "public"."inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
