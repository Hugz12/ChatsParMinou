CREATE TABLE `utilisateur` (
  `mail` varchar(255) PRIMARY KEY,
  `password` varchar(255),
  `name` varchar(255),
  `role` varchar(255)
)ENGINE = InnoDB;

CREATE TABLE `chat` (
  `code` int PRIMARY KEY,
  `name` varchar(255),
  `dateDeNaissance` date,
  `race` varchar(255),
  `sexe` boolean,
  `statut` varchar(255),
  `description` varchar(255),
  `chatDuMois` boolean,
  `nbDemande` int,
  `familleAccueil` boolean,
  `vues` int,
  `nbPhoto` int,
  `couleur` varchar(255)
)ENGINE = InnoDB;

CREATE TABLE `demandeAdoption` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `date` datetime,
  `nom` varchar(255),
  `prenom` varchar(255),
  `mail` varchar(255),
  `tel` varchar(255),
  `adresse` varchar(255),
  `habitation` varchar(255),
  `exterieur` boolean,
  `sortie` boolean,
  `situationFamiliale` varchar(255),
  `animaux` varchar(255),
  `commentaire` varchar(255),
  `statutDemande` int,
  `memo` varchar(255),
  `datePv` varchar(255),
  `resultatPv` varchar(255),
  `dateRencontre` varchar(255)
)ENGINE = InnoDB;

CREATE TABLE `passageRefuge` (
  `date` datetime,
  `heureDebut` time,
  `heureFin` time,
  `mailBenevole` varchar(255),
  `description` varchar(255),
  PRIMARY KEY (`date`, `heureDebut`, `heureFin`)
)ENGINE = InnoDB;

CREATE TABLE `evenement` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `titre` varchar(255),
  `description` varchar(255),
  `date` datetime,
  `couleur` varchar(255)
)ENGINE = InnoDB;

CREATE TABLE `concerne` (
  `idDemande` int,
  `codeChat` int,
  PRIMARY KEY (`idDemande`, `codeChat`)
)ENGINE = InnoDB;

CREATE TABLE `hebergement` (
  `mailHebergeur` varchar(255),
  `codeChat` int,
  PRIMARY KEY (`mailHebergeur`, `codeChat`)
)ENGINE = InnoDB;

CREATE TABLE `divers` (
  `name` varchar(255) PRIMARY KEY,
  `parent` varchar(255),
  `value` varchar(255)
)ENGINE = InnoDB;

ALTER TABLE `passageRefuge` ADD FOREIGN KEY (`mailBenevole`) REFERENCES `utilisateur` (`mail`);

ALTER TABLE `concerne` ADD FOREIGN KEY (`codeChat`) REFERENCES `chat` (`code`);

ALTER TABLE `concerne` ADD FOREIGN KEY (`idDemande`) REFERENCES `demandeAdoption` (`id`);

ALTER TABLE `hebergement` ADD FOREIGN KEY (`mailHebergeur`) REFERENCES `utilisateur` (`mail`);

ALTER TABLE `hebergement` ADD FOREIGN KEY (`codeChat`) REFERENCES `chat` (`code`);

ALTER TABLE `divers` ADD FOREIGN KEY (`parent`) REFERENCES `divers` (`name`);
