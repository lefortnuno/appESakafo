-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-esakafo.alwaysdata.net
-- Generation Time: Oct 19, 2023 at 07:56 PM
-- Server version: 10.6.14-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esakafo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `designation_categorie` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `designation_categorie`) VALUES
(1, 'Laoka'),
(2, 'Dessert'),
(3, 'Entrée'),
(4, 'Crudité');

-- --------------------------------------------------------

--
-- Table structure for table `comprend`
--

CREATE TABLE `comprend` (
  `id_recette` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL,
  `quantite` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comprend`
--

INSERT INTO `comprend` (`id_recette`, `id_ingredient`, `quantite`) VALUES
(1, 1, '500 g'),
(1, 2, '2'),
(1, 3, '2'),
(1, 4, '500 g'),
(2, 2, '2'),
(2, 3, '2'),
(2, 5, '5'),
(2, 6, '500 g'),
(2, 9, '1'),
(6, 1, '500 g'),
(6, 2, '2'),
(6, 3, '2'),
(6, 9, '1'),
(33, 13, '285 g'),
(33, 14, '40 cl'),
(33, 15, '25 cl'),
(33, 16, '10 cl'),
(33, 17, '3g'),
(34, 2, '1'),
(34, 3, '1'),
(34, 7, '1'),
(34, 18, '250 g'),
(34, 19, '80 g'),
(34, 20, '2'),
(34, 21, '2 càs'),
(34, 22, '2');

-- --------------------------------------------------------

--
-- Table structure for table `difficulte`
--

CREATE TABLE `difficulte` (
  `id_difficulte` int(11) NOT NULL,
  `designation_difficulte` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `difficulte`
--

INSERT INTO `difficulte` (`id_difficulte`, `designation_difficulte`) VALUES
(1, 'Facile'),
(2, 'Intermediaire'),
(3, 'Difficile');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient`
--

CREATE TABLE `ingredient` (
  `id_ingredient` int(11) NOT NULL,
  `designation_ingredient` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ingredient`
--

INSERT INTO `ingredient` (`id_ingredient`, `designation_ingredient`) VALUES
(5, 'Anana'),
(13, 'Chocolat noir'),
(21, 'Crème fraiche épaisse'),
(14, 'Crème liquide entière'),
(17, 'Gélatine'),
(7, 'Hena kisoa'),
(6, 'Henan\'omby'),
(8, 'Karoty'),
(16, 'Lait de coco'),
(15, 'Lait entier'),
(18, 'Mascarpone'),
(10, 'Mofo'),
(22, 'œuf '),
(20, 'Orange'),
(9, 'Sakamalao'),
(19, 'Sucre en poudre'),
(3, 'Tongolo'),
(1, 'Trondro'),
(2, 'Voatabia'),
(4, 'Voatavo');

-- --------------------------------------------------------

--
-- Table structure for table `recette`
--

CREATE TABLE `recette` (
  `id_recette` int(11) NOT NULL,
  `nom_recette` varchar(50) DEFAULT NULL,
  `temps_preparation` varchar(50) DEFAULT NULL,
  `description_recette` varchar(50) DEFAULT NULL,
  `id_difficulte` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `contenu_recette` varchar(1000) DEFAULT NULL,
  `perso` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recette`
--

INSERT INTO `recette` (`id_recette`, `nom_recette`, `temps_preparation`, `description_recette`, `id_difficulte`, `id_categorie`, `contenu_recette`, `perso`) VALUES
(1, 'Trondro sy voatavo', '50 min', 'Trondro sy voatavo façon gasigasy :)', 3, 1, NULL, 0),
(2, 'Anana sy hen\'omby', '30 min', 'Anana sy hen\'omby tsy mitovy amin\'ny mahazatra', 1, 1, NULL, 0),
(6, 'Trondro sauce', '40mn', 'Trondro sauce matsiro', 1, 1, 'Voasana ny tongolo tonga dia atao ao tonga dia bou', 0),
(27, 'Style sy cahier', '20mn', 'Mampahay io fa hoano', 1, 1, 'Mividy cahier sy stylo Dia hoano', 0),
(33, 'Mousse au chocolat sans œufs', '20 min', 'Allergiques aux œufs ? Essaie ça', 1, 2, 'Verser la crème et le lait de coco dans le bol du mixer puis réserver au frais.\r\nFaire tremper les feuilles de gélatine dans un bol d\'eau froide 5 minutes puis les essorer.\r\nCouper le chocolat en morceaux. Faire fondre le chocolat dans un bol disposé sur une casserole remplie d\'eau et chauffer au bain marie en mélangeant.\r\nDans une casserole, faire bouillir le lait entier et ajouter la gélatine essorée.\r\nVerser le lait sur le chocolat fondu en 3 fois, en mélangeant.\r\nBattre la crème avec le lait de coco qui étaient réservés au frais pour une obtenir une crème montée mousseuse.\r\nVerser le chocolat dans le bol avec la crème montée mousseuse et mélanger délicatement.\r\nDisposer la mousse dans des ramequins ou verrines et couvrir d\'un film étirable. Placer au frais pendant 6 heures.', 1),
(34, 'Mousse express à l\'orange', '15 min', 'Un délicieux dessert onctueux, simple et rapide', 2, 2, 'Laver les oranges, prélever les zestes et presser le jus.\r\nDans 2 saladiers, séparer les jaunes des blancs d’œufs.\r\nVerser le sucre sur les jaunes et fouetter jusqu’à ce que le mélange blanchisse. Ajouter le mascarpone puis la crème épaisse. Verser le jus d\'orange et la moitié des zestes.\r\nBattre les blancs en neige et les incorporer délicatement au mélange jaune-sucre-jus d\'orange.\r\nRépartir la préparation dans des coupes ou verrines et décorer avec le reste des zestes. Laisser les mousses à l\'orange au frigo quelques heures avant de déguster.', 1),
(35, 'dsfdsf', '25mn', 'bla bla bla bla', 1, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('08258073-1200-4383-a51e-5fd1c56c65a1', 'aec7ccb71024e394ea949b76a40e3e630e373ee848c7eeaff655800a3ef0b873', '2023-09-27 09:20:05.422', '0_init', NULL, NULL, '2023-09-27 09:20:03.984', 1),
('10684284-5a3c-450a-8829-d457867b61d2', '89d03a5fa8b11fb92c23a3d7f31c632e2cd7cd986c205ba639837217973ac5f2', '2023-09-27 09:20:06.783', '20230924192125_1_0', NULL, NULL, '2023-09-27 09:20:05.984', 1),
('36a467f1-a66f-4e0f-8ff4-30b333d1218e', 'b4a0fe00d3225be499f9fe833183f02d6f6b75a547a40b564602cfd8058166a3', '2023-10-17 17:19:31.536', '20231017171918_17sep2', NULL, NULL, '2023-10-17 17:19:30.305', 1),
('584b546c-03f0-458f-92fd-2dae90737bd1', '01726334dc91053df5306c73873212238bdbba31aa9e6c0c4d61c1e788c96ad4', '2023-09-27 15:27:32.157', '20230927152730_etape', NULL, NULL, '2023-09-27 15:27:31.099', 1),
('6886022f-6aa1-4f0d-952f-3d5b4abb55d9', '187d83d6f06d4ffacdba122275473999baca511b8f57c1cd8e7b3d06691fa35d', '2023-10-02 07:19:17.425', '20231002071912_2oct', NULL, NULL, '2023-10-02 07:19:15.749', 1),
('a41eda36-a910-4a76-ac5b-e34976b9b670', '7349131f93daa86da7c867f4fa2cfebfccd7099b02cb02a435db0c3c69f7f439', '2023-10-17 17:01:17.255', '20231017170115_17sep', NULL, NULL, '2023-10-17 17:01:16.033', 1),
('ca04c5ea-23d2-47d6-be2f-896211568bb7', 'a24ef73cb882d75cb509d9d0e88241fe72bd856fd8515bc9cf2d1eb3525296b1', '2023-09-27 09:20:23.263', '20230927092021_27sept', NULL, NULL, '2023-09-27 09:20:22.465', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`);

--
-- Indexes for table `comprend`
--
ALTER TABLE `comprend`
  ADD PRIMARY KEY (`id_recette`,`id_ingredient`),
  ADD KEY `id_ingredient` (`id_ingredient`);

--
-- Indexes for table `difficulte`
--
ALTER TABLE `difficulte`
  ADD PRIMARY KEY (`id_difficulte`);

--
-- Indexes for table `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id_ingredient`),
  ADD UNIQUE KEY `ingredient_designation_ingredient_key` (`designation_ingredient`);

--
-- Indexes for table `recette`
--
ALTER TABLE `recette`
  ADD PRIMARY KEY (`id_recette`),
  ADD KEY `id_categorie` (`id_categorie`),
  ADD KEY `id_difficulte` (`id_difficulte`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `difficulte`
--
ALTER TABLE `difficulte`
  MODIFY `id_difficulte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id_ingredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `recette`
--
ALTER TABLE `recette`
  MODIFY `id_recette` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comprend`
--
ALTER TABLE `comprend`
  ADD CONSTRAINT `comprend_ibfk_1` FOREIGN KEY (`id_recette`) REFERENCES `recette` (`id_recette`) ON DELETE CASCADE,
  ADD CONSTRAINT `comprend_ibfk_2` FOREIGN KEY (`id_ingredient`) REFERENCES `ingredient` (`id_ingredient`) ON DELETE CASCADE;

--
-- Constraints for table `recette`
--
ALTER TABLE `recette`
  ADD CONSTRAINT `recette_ibfk_1` FOREIGN KEY (`id_difficulte`) REFERENCES `difficulte` (`id_difficulte`) ON DELETE CASCADE,
  ADD CONSTRAINT `recette_ibfk_3` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
