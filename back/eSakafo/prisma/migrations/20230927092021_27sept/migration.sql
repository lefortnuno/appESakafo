-- DropForeignKey
ALTER TABLE `etape` DROP FOREIGN KEY `etape_id_recette_fkey`;

-- DropForeignKey
ALTER TABLE `etape` DROP FOREIGN KEY `etape_id_recettefkey`;

-- DropForeignKey
ALTER TABLE `recette` DROP FOREIGN KEY `recette_id_categorie_fkey`;

-- DropForeignKey
ALTER TABLE `recette` DROP FOREIGN KEY `recette_id_categoriefkey`;

-- DropForeignKey
ALTER TABLE `recette` DROP FOREIGN KEY `recette_id_difficulte_fkey`;

-- DropForeignKey
ALTER TABLE `recette` DROP FOREIGN KEY `recette_id_difficultefkey`;

-- AlterTable
ALTER TABLE `comprend` MODIFY `quantite` VARCHAR(50) NULL;

-- AddForeignKey
ALTER TABLE `comprend` ADD CONSTRAINT `comprend_ibfk_1` FOREIGN KEY (`id_recette`) REFERENCES `recette`(`id_recette`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comprend` ADD CONSTRAINT `comprend_ibfk_2` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredient`(`id_ingredient`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `etape` ADD CONSTRAINT `etape_ibfk_1` FOREIGN KEY (`id_recette`) REFERENCES `recette`(`id_recette`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `recette` ADD CONSTRAINT `recette_ibfk_1` FOREIGN KEY (`id_difficulte`) REFERENCES `difficulte`(`id_difficulte`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `recette` ADD CONSTRAINT `recette_ibfk_3` FOREIGN KEY (`id_categorie`) REFERENCES `categorie`(`id_categorie`) ON DELETE CASCADE ON UPDATE RESTRICT;
