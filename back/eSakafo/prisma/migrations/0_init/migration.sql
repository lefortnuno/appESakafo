-- CreateTable
CREATE TABLE `categorie` (
    `id_categorie` INTEGER NOT NULL AUTO_INCREMENT,
    `designation_categorie` VARCHAR(50) NULL,

    PRIMARY KEY (`id_categorie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comprend` (
    `id_recette` INTEGER NOT NULL,
    `id_ingredient` INTEGER NOT NULL,
    `quantite` INTEGER NULL,

    INDEX `id_ingredient`(`id_ingredient`),
    PRIMARY KEY (`id_recette`, `id_ingredient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `difficulte` (
    `id_difficulte` INTEGER NOT NULL AUTO_INCREMENT,
    `designation_difficulte` VARCHAR(50) NULL,

    PRIMARY KEY (`id_difficulte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etape` (
    `id_etape` INTEGER NOT NULL AUTO_INCREMENT,
    `description_etape` VARCHAR(50) NULL,
    `id_recette` INTEGER NOT NULL,

    INDEX `id_recette`(`id_recette`),
    PRIMARY KEY (`id_etape`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredient` (
    `id_ingredient` INTEGER NOT NULL AUTO_INCREMENT,
    `designation_ingredient` VARCHAR(50) NULL,

    PRIMARY KEY (`id_ingredient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recette` (
    `id_recette` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_recette` VARCHAR(50) NULL,
    `temps_preparation` VARCHAR(50) NULL,
    `description_recette` VARCHAR(50) NULL,
    `id_difficulte` INTEGER NOT NULL,
    `id_categorie` INTEGER NOT NULL,

    INDEX `id_categorie`(`id_categorie`),
    INDEX `id_difficulte`(`id_difficulte`),
    PRIMARY KEY (`id_recette`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `etape` ADD CONSTRAINT `etape_id_recette_fkey` FOREIGN KEY (`id_recette`) REFERENCES `recette`(`id_recette`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recette` ADD CONSTRAINT `recette_id_difficulte_fkey` FOREIGN KEY (`id_difficulte`) REFERENCES `difficulte`(`id_difficulte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recette` ADD CONSTRAINT `recette_id_categorie_fkey` FOREIGN KEY (`id_categorie`) REFERENCES `categorie`(`id_categorie`) ON DELETE RESTRICT ON UPDATE CASCADE;

