-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 22. Jul 2015 um 16:46
-- Server Version: 5.5.34
-- PHP-Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `ToDoPlatform`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ToDo`
--

CREATE TABLE IF NOT EXISTS `ToDo` (
`id` int(255) unsigned NOT NULL,
  `user_id` int(6) unsigned DEFAULT NULL,
  `topic` varchar(130) NOT NULL,
  `description` varchar(130) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Daten für Tabelle `ToDo`
--

INSERT INTO `ToDo` (`id`, `user_id`, `topic`, `description`, `status`) VALUES
(3, 21, 'KfW', 'Op risk', 1),
(4, 21, 'Meine', 'ID', 1),
(5, 24, 'asdf', 'jklÃ¶', 1),
(6, 25, 'asd', 'jklÃ¶', 1),
(7, 25, 'asd', 'dsadsa', 1),
(8, 25, 'rofl', 'mÃ¶p', 1),
(9, 24, 'homo', 'phob', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `User`
--

CREATE TABLE IF NOT EXISTS `User` (
`id` int(6) unsigned NOT NULL,
  `username` varchar(130) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=26 ;

--
-- Daten für Tabelle `User`
--

INSERT INTO `User` (`id`, `username`, `password`) VALUES
(21, 'niklas', '$2y$10$kH6Ir46CQR7W/ll0TvD.g..Kc8eqfcK3Wuaj8n2cs6GKK9vfzW5j2'),
(22, 'gf', '$2y$10$XifRQMQvpmAijdjr2/MdL.ScmcnPh.2HbsKiAWljfxuiDCP4HU4/m'),
(23, 'fsadfasdf', '$2y$10$txsGDyOwq2HpzWEj8xLWdOwGPRlSaGlq0ujhOZRNoR1owu.RlKWRK'),
(24, 'caro', '$2y$10$T2tfNyQa9ebxeGkXDjiRmeqnTh7MkiCIwXhurhAM1C.C8ivNZuDCW'),
(25, 'lol', '$2y$10$39wQSWCFE2eHRKUxfk6bCeSF0hZa7iulAechiuyMdowmXyCoubX0a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ToDo`
--
ALTER TABLE `ToDo`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ToDo`
--
ALTER TABLE `ToDo`
MODIFY `id` int(255) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
MODIFY `id` int(6) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=26;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ToDo`
--
ALTER TABLE `ToDo`
ADD CONSTRAINT `todo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
