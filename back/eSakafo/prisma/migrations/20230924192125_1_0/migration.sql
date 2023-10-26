-- AddForeignKey
ALTER TABLE `etape` ADD CONSTRAINT `etape_id_recettefkey` FOREIGN KEY (`id_recette`) REFERENCES `recette`(`id_recette`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recette` ADD CONSTRAINT `recette_id_difficultefkey` FOREIGN KEY (`id_difficulte`) REFERENCES `difficulte`(`id_difficulte`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recette` ADD CONSTRAINT `recette_id_categoriefkey` FOREIGN KEY (`id_categorie`) REFERENCES `categorie`(`id_categorie`) ON DELETE CASCADE ON UPDATE CASCADE;
