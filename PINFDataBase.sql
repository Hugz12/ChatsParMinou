CREATE TABLE `utilisateur` (
  `mail` varchar(255) PRIMARY KEY,
  `password` varchar(255),
  `name` varchar(255),
  `role` int
)ENGINE = InnoDB;

CREATE TABLE `chat` (
  `code` int PRIMARY KEY,
  `name` varchar(255),
  `dateDeNaissance` date,
  `race` varchar(255),
  `sexe` boolean,
  `statut` int,
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


/*INSERTION DES DONNEES*/

/*utilisateur*/
INSERT INTO `utilisateur` (`mail`, `password`, `name`, `role`)
VALUES ('admin@gmail.com', 'admin', 'admin', '1');

INSERT INTO `utilisateur` (`mail`, `password`, `name`, `role`)
VALUES ('user@gmail.com', 'user', 'user', '3');

/*chat*/
INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `statut`, `description`, `chatDuMois`, `nbDemande`, `familleAccueil`, `vues`, `nbPhoto`, `couleur`) 
VALUES ('1', 'Mimi', '2023-04-01', 'Chat tigré', '1', '2', "Bonjour moi c'est mimi et je cherche quelqu'un avec qui vivre pour l'eternité", '0', '1', '0', '1', '4', '#FF0000');

INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `statut`, `description`, `chatDuMois`, `nbDemande`, `familleAccueil`, `vues`, `nbPhoto`, `couleur`) 
VALUES ('2', 'Satine', '2023-04-01', 'Chat tigré', '1', '3', "Je m'appelle satine et j'adore les calins, si tu m'adopte je te ferais pleins de calin", '0', '1', '0', '1', '2', '#A569BD');

INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `statut`, `description`, `chatDuMois`, `nbDemande`, `familleAccueil`, `vues`, `nbPhoto`, `couleur`) 
VALUES ('3', 'Sunset', '2023-04-01', 'Chat blanc', '1', '1', "Je suis un peu timide mais quand on me connait bien je suis adorable", '0', '1', '0', '1', '2', '#117A65');

INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `statut`, `description`, `chatDuMois`, `nbDemande`, `familleAccueil`, `vues`, `nbPhoto`, `couleur`) 
VALUES ('4', 'Salto', '2023-04-01', 'Chat roux', '1', '1', "J'adore faire la fete et sauter partout. Wouhou!", '1', '0', '1', '0', '1', '#D35400');


/*demandeAdoption*/
INSERT INTO `demandeAdoption` (`id`, `date`, `codeChat`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1', '2023-04-01 00:00:00', '1', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', '1', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `codeChat`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('2', '2023-04-01 00:00:00', '2', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', '1', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `codeChat`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('3', '2023-04-01 00:00:00', '3', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', '1', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');


/*passageRefuge*/
INSERT INTO `passageRefuge` (`date`, `heureDebut`, `heureFin`, `mailBenevole`, `description`)
VALUES ('2023-04-01 00:00:00', '10:00:00', '12:00:00', 'user@gmail.com', "Je vais faire le ménage");

INSERT INTO `passageRefuge` (`date`, `heureDebut`, `heureFin`, `mailBenevole`, `description`)
VALUES ('2023-04-02 00:00:00', '10:00:00', '12:00:00', 'user@gmail.com', "Je vais faire le ménage");

INSERT INTO `passageRefuge` (`date`, `heureDebut`, `heureFin`, `mailBenevole`, `description`)
VALUES ('2023-04-03 00:00:00', '10:00:00', '12:00:00', 'user@gmail.com', "Je vais faire le ménage");


/*evenement*/
INSERT INTO `evenement` (`id`, `titre`, `description`, `date`, `couleur`)
VALUES ('1', 'Fête des chats', 'La fete avec pleins de chats', '2023-04-01 00:00:00', '#CA6f1E');

INSERT INTO `evenement` (`id`, `titre`, `description`, `date`, `couleur`)
VALUES ('2', 'Fête des chien', 'La fete avec pleins de chien', '2023-04-02 00:00:00', '#AED6F1');

/*concerne*/
INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('2', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('3', '3');


/*hebergement*/
INSERT INTO `hebergement` (`mailHebergeur`, `codeChat`)
VALUES ('user@gmail.com', '4');


