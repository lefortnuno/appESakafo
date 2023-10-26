/*
  Warnings:

  - You are about to drop the `etape` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `etape` DROP FOREIGN KEY `etape_ibfk_1`;

-- AlterTable
ALTER TABLE `recette` ADD COLUMN `contenu_recette` VARCHAR(1000) NULL;

-- DropTable
DROP TABLE `etape`;
