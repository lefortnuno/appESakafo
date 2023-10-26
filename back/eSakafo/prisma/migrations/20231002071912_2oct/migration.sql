/*
  Warnings:

  - A unique constraint covering the columns `[designation_ingredient]` on the table `ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ingredient_designation_ingredient_key` ON `ingredient`(`designation_ingredient`);
