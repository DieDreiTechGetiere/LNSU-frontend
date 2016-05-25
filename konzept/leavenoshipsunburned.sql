-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 25. Mai 2016 um 11:29
-- Server-Version: 5.5.42
-- PHP-Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `leavenoshipsunburned`
--
CREATE DATABASE IF NOT EXISTS `leavenoshipsunburned` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `leavenoshipsunburned`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tblmatch`
--

DROP TABLE IF EXISTS `tblmatch`;
CREATE TABLE `tblmatch` (
  `matchID` int(11) NOT NULL,
  `User1` int(11) NOT NULL DEFAULT '0',
  `User2` int(11) NOT NULL DEFAULT '0',
  `Date` date NOT NULL,
  `Winner` int(11) NOT NULL,
  `User2ELO` int(11) NOT NULL,
  `User1ELO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `tblmatch`
--

INSERT INTO `tblmatch` (`matchID`, `User1`, `User2`, `Date`, `Winner`, `User2ELO`, `User1ELO`) VALUES
(137, 92, 92, '2016-05-13', 0, 1000, 1000),
(138, 92, 92, '2016-05-13', 0, 1000, 1000),
(140, 92, 92, '2016-05-13', 0, 1000, 1000),
(142, 92, 92, '2016-05-13', 0, 1000, 1000),
(144, 92, 92, '2016-05-13', 0, 1000, 1000),
(146, 92, 92, '2016-05-13', 0, 1000, 1000),
(148, 92, 92, '2016-05-13', 0, 1000, 1000),
(150, 92, 92, '2016-05-13', 0, 1000, 1000),
(152, 92, 92, '2016-05-13', 0, 1000, 1000),
(154, 92, 92, '2016-05-13', 0, 1000, 1000),
(156, 92, 92, '2016-05-13', 0, 1000, 1000),
(158, 92, 92, '2016-05-13', 0, 1000, 1000),
(160, 92, 92, '2016-05-13', 0, 1000, 1000),
(162, 92, 92, '2016-05-13', 0, 1000, 1000),
(164, 92, 92, '2016-05-13', 0, 1000, 1000),
(166, 92, 92, '2016-05-13', 0, 1000, 1000),
(168, 92, 92, '2016-05-13', 0, 1000, 1000),
(170, 92, 92, '2016-05-13', 0, 1000, 1000),
(172, 92, 92, '2016-05-13', 0, 1000, 1000),
(174, 92, 92, '2016-05-13', 0, 1000, 1000),
(176, 92, 92, '2016-05-13', 0, 1000, 1000),
(178, 92, 92, '2016-05-13', 0, 1000, 1000),
(180, 92, 92, '2016-05-13', 0, 1000, 1000),
(182, 92, 92, '2016-05-13', 0, 1000, 1000),
(184, 92, 92, '2016-05-13', 0, 1000, 1000),
(186, 92, 92, '2016-05-13', 0, 1000, 1000),
(187, 92, 92, '2016-05-13', 0, 1000, 1000),
(189, 92, 92, '2016-05-13', 0, 1000, 1000),
(191, 92, 92, '2016-05-13', 0, 1000, 1000),
(194, 92, 96, '2016-05-24', 0, 1000, 1000),
(196, 92, 92, '2016-05-24', 0, 1000, 1000),
(198, 92, 92, '2016-05-24', 0, 1000, 1000),
(200, 92, 92, '2016-05-24', 0, 1000, 1000),
(202, 92, 92, '2016-05-24', 0, 1000, 1000),
(204, 92, 92, '2016-05-24', 0, 1000, 1000),
(206, 92, 92, '2016-05-24', 0, 1000, 1000),
(208, 92, 92, '2016-05-24', 0, 1000, 1000),
(210, 92, 92, '2016-05-24', 0, 1000, 1000),
(212, 92, 92, '2016-05-24', 0, 1000, 1000),
(214, 92, 92, '2016-05-24', 0, 1000, 1000),
(216, 92, 92, '2016-05-24', 0, 1000, 1000),
(217, 92, 96, '2016-05-25', 0, 1000, 1000);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tblmatchsteps`
--

DROP TABLE IF EXISTS `tblmatchsteps`;
CREATE TABLE `tblmatchsteps` (
  `msID` int(11) NOT NULL,
  `mMatchID` int(11) NOT NULL,
  `mUserID` int(11) NOT NULL,
  `mRow` int(11) NOT NULL,
  `mColumn` int(11) NOT NULL,
  `mState` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tblshipposition`
--

DROP TABLE IF EXISTS `tblshipposition`;
CREATE TABLE `tblshipposition` (
  `spID` int(11) NOT NULL,
  `spLength` int(11) NOT NULL,
  `spMatchID` int(11) NOT NULL,
  `spUserID` int(11) NOT NULL,
  `spX` int(11) NOT NULL,
  `spY` int(11) NOT NULL,
  `spDirection` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `tblshipposition`
--

INSERT INTO `tblshipposition` (`spID`, `spLength`, `spMatchID`, `spUserID`, `spX`, `spY`, `spDirection`) VALUES
(1, 3, 217, 92, 4, 0, 1),
(2, 2, 217, 92, 10, 1, 1),
(3, 1, 217, 92, 6, 2, 0),
(4, 1, 217, 92, 4, 3, 0),
(5, 2, 217, 92, 8, 3, 1),
(6, 1, 217, 92, 4, 5, 0),
(7, 1, 217, 92, 6, 5, 0),
(8, 2, 217, 92, 8, 5, 1),
(9, 3, 217, 92, 8, 7, 1),
(10, 4, 217, 92, 4, 9, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tbluser`
--

DROP TABLE IF EXISTS `tbluser`;
CREATE TABLE `tbluser` (
  `id` int(11) NOT NULL,
  `role` int(11) UNSIGNED ZEROFILL NOT NULL DEFAULT '00000000000',
  `timestamp` varchar(100) NOT NULL DEFAULT '0',
  `ELO` int(11) NOT NULL DEFAULT '1000',
  `loginName` varchar(25) DEFAULT NULL,
  `totalOppELO` int(11) DEFAULT '0',
  `ingameName` varchar(25) DEFAULT NULL,
  `password` mediumtext,
  `freigeschaltet` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `tbluser`
--

INSERT INTO `tbluser` (`id`, `role`, `timestamp`, `ELO`, `loginName`, `totalOppELO`, `ingameName`, `password`, `freigeschaltet`) VALUES
(84, 00000000000, '1455544267015', 1000, 'a', NULL, 'a', 'd9df475247cac44b8e735a1e5', b'0'),
(85, 00000000000, '1455545612527', 1000, 'b', NULL, 'b', '0e7eb6c8d0ad66d65ee228bf9', b'0'),
(86, 00000000000, '1455545758182', 1000, 'c', NULL, 'c', 'abd463199a2ed476cadcfea34', b'0'),
(87, 00000000000, '1455545795614', 1000, 'd', NULL, 'd', '60382b4cbbf4d084ef215a9e1', b'0'),
(88, 00000000000, '1455545944229', 1000, 'f', NULL, 'f', '6ec8ecef6474826aee26188b3', b'0'),
(89, 00000000000, '1455546153531', 1000, 'as', NULL, 'as', '7dcd461e6102b21960019e425', b'0'),
(90, 00000000000, '1455546185279', 2500, 'ab', NULL, 'ab', '824ea3081c95a7937351c4bdc9956eeb', b'1'),
(91, 00000000000, '1455547318036', 1000, 'marcus', NULL, 'marcus', 'c94bbd44c39c2b5d1024b2ebb0e13bc3', b'1'),
(92, 00000000001, '1455802885325', 1000, 'h', NULL, 'h', '9f4b3baf0ffc8d9ce2828449f1bf7608', b'1'),
(93, 00000000000, '1455894338035', 1000, 'awojnar', 0, 'Alexander Wojnar', '00793acec4e6cf95f3ed14f9d41b74eb', b'0'),
(96, 00000000000, '1455730271083', 1000, 'niklas', 0, 'Schokolade', '387565df7b1a27c8c30f68db480a6286', b'1'),
(97, 00000000000, '1455730121002', 1000, 'jakob', 0, 'jakob', '8853d1c173ad44cb02563885d5c0ab98', b'1');

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `view_highscore`
--
DROP VIEW IF EXISTS `view_highscore`;
CREATE TABLE `view_highscore` (
`id` int(11)
,`ELO` int(11)
,`ingameName` varchar(25)
);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `view_stats`
--
DROP VIEW IF EXISTS `view_stats`;
CREATE TABLE `view_stats` (
`id` int(11)
,`totalMatches` bigint(22)
,`wins` bigint(21)
,`loses` bigint(23)
,`ELO` int(11)
);

-- --------------------------------------------------------

--
-- Struktur des Views `view_highscore`
--
DROP TABLE IF EXISTS `view_highscore`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_highscore`  AS  select `tbluser`.`id` AS `id`,`tbluser`.`ELO` AS `ELO`,`tbluser`.`ingameName` AS `ingameName` from `tbluser` ;

-- --------------------------------------------------------

--
-- Struktur des Views `view_stats`
--
DROP TABLE IF EXISTS `view_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_stats`  AS  select `tbluser`.`id` AS `id`,(count(distinct `m1`.`matchID`) + count(distinct `m2`.`matchID`)) AS `totalMatches`,count(distinct `win`.`matchID`) AS `wins`,((count(distinct `m1`.`matchID`) + count(distinct `m2`.`matchID`)) - count(distinct `win`.`matchID`)) AS `loses`,`tbluser`.`ELO` AS `ELO` from (((`tbluser` left join `tblmatch` `m1` on((`tbluser`.`id` = `m1`.`User1`))) left join `tblmatch` `m2` on((`tbluser`.`id` = `m2`.`User2`))) left join `tblmatch` `win` on((`tbluser`.`id` = `win`.`Winner`))) group by `tbluser`.`id` ;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `tblmatch`
--
ALTER TABLE `tblmatch`
  ADD PRIMARY KEY (`matchID`);

--
-- Indizes für die Tabelle `tblmatchsteps`
--
ALTER TABLE `tblmatchsteps`
  ADD PRIMARY KEY (`msID`),
  ADD KEY `fk_Match` (`mMatchID`),
  ADD KEY `fk_User` (`mUserID`);

--
-- Indizes für die Tabelle `tblshipposition`
--
ALTER TABLE `tblshipposition`
  ADD PRIMARY KEY (`spID`),
  ADD KEY `fk_spMatch` (`spMatchID`),
  ADD KEY `fk_spUser` (`spUserID`);

--
-- Indizes für die Tabelle `tbluser`
--
ALTER TABLE `tbluser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uLoginName` (`loginName`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `tblmatch`
--
ALTER TABLE `tblmatch`
  MODIFY `matchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;
--
-- AUTO_INCREMENT für Tabelle `tblmatchsteps`
--
ALTER TABLE `tblmatchsteps`
  MODIFY `msID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `tblshipposition`
--
ALTER TABLE `tblshipposition`
  MODIFY `spID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT für Tabelle `tbluser`
--
ALTER TABLE `tbluser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `tblmatchsteps`
--
ALTER TABLE `tblmatchsteps`
  ADD CONSTRAINT `fk_Match` FOREIGN KEY (`mMatchID`) REFERENCES `tblmatch` (`matchID`),
  ADD CONSTRAINT `fk_User` FOREIGN KEY (`mUserID`) REFERENCES `tbluser` (`id`);

--
-- Constraints der Tabelle `tblshipposition`
--
ALTER TABLE `tblshipposition`
  ADD CONSTRAINT `fk_spMatch` FOREIGN KEY (`spMatchID`) REFERENCES `tblmatch` (`matchID`),
  ADD CONSTRAINT `fk_spUser` FOREIGN KEY (`spUserID`) REFERENCES `tbluser` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
