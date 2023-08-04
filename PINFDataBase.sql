CREATE TABLE `utilisateur` (
  `mail` varchar(255) PRIMARY KEY,
  `password` varchar(255),
  `name` varchar(255),
  `role` int
)ENGINE = InnoDB;

CREATE TABLE `chat` (
  `code` varchar(255) PRIMARY KEY,
  `name` varchar(255),
  `dateDeNaissance` date,
  `race` varchar(255),
  `sexe` boolean,
  `description` varchar(3000),
  `chatDuMois` boolean,
  `familleAccueil` boolean,
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
  `commentaire` varchar(3000),
  `statutDemande` int,
  `memo` varchar(3000),
  `datePv` varchar(255),
  `resultatPv` varchar(255),
  `dateRencontre` varchar(255)
)ENGINE = InnoDB;

CREATE TABLE `passageRefuge` (
  `date` datetime,
  `heureDebut` time,
  `heureFin` time,
  `mailBenevole` varchar(255),
  `description` varchar(3000),
  PRIMARY KEY (`date`, `heureDebut`, `heureFin`)
)ENGINE = InnoDB;

CREATE TABLE `evenement` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `titre` varchar(255),
  `description` varchar(3000),
  `date` date,
  `heureDebut` time,
  `heureFin` time
)ENGINE = InnoDB;

CREATE TABLE `concerne` (
  `idDemande` int,
  `codeChat` varchar(255),
  PRIMARY KEY (`idDemande`, `codeChat`)
)ENGINE = InnoDB;

CREATE TABLE `conseils` (
  `name` varchar(255) PRIMARY KEY,
  `description` varchar(3000)
)ENGINE = InnoDB;

CREATE TABLE `codeMail` (
  `code` varchar(13) PRIMARY KEY,
  `ancienMail` varchar(255),
  `info` varchar(255)
)ENGINE = InnoDB;

ALTER TABLE `passageRefuge` ADD FOREIGN KEY (`mailBenevole`) REFERENCES `utilisateur` (`mail`);

ALTER TABLE `concerne` ADD FOREIGN KEY (`codeChat`) REFERENCES `chat` (`code`);

ALTER TABLE `concerne` ADD FOREIGN KEY (`idDemande`) REFERENCES `demandeAdoption` (`id`);

/*INSERTION DES DONNEES*/

/*utilisateur*/
INSERT INTO `utilisateur` (`mail`, `password`, `name`, `role`)
VALUES ('admin@gmail.com', '$2y$10$GAlmWCWPOwmv.INst19B/eTuRfCkykWnQ6rPfbGOtdN59bw9LXkAa', 'admin', '1');

INSERT INTO `utilisateur` (`mail`, `password`, `name`, `role`)
VALUES ('user@gmail.com', '$2y$10$pMANbag2FYSUNdxQuyL.BeEVjHL5kwwTk0cN357TXumdBTlcsRvQC', 'user', '3');

/*chat*/
INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `description`, `chatDuMois`, `familleAccueil`, `nbPhoto`, `couleur`) 
VALUES ('1', 'Mimi', '2023-04-01', 'Chat tigré', '1', "Bonjour moi c'est mimi et je cherche quelqu'un avec qui vivre pour l'eternité", '0', '0', '4', '#FF0000');

INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `description`, `chatDuMois`, `familleAccueil`, `nbPhoto`, `couleur`) 
VALUES ('2', 'Satine', '2023-04-01', 'Chat tigré', '1', "Je m'appelle satine et j'adore les calins, si tu m'adopte je te ferais pleins de calin", '0', '0', '2', '#A569BD');

INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `description`, `chatDuMois`, `familleAccueil`, `nbPhoto`, `couleur`) 
VALUES ('3', 'Sunset', '2023-04-01', 'Chat blanc', '1', "Je suis un peu timide mais quand on me connait bien je suis adorable", '0', '0', '2', '#117A65');

INSERT INTO `chat` (`code`, `name`, `dateDeNaissance`, `race`, `sexe`, `description`, `chatDuMois`, `familleAccueil`, `nbPhoto`, `couleur`) 
VALUES ('4', 'Salto', '2023-04-01', 'Chat roux', '1', "J'adore faire la fete et sauter partout. Wouhou!", '1', '1', '1', '#D35400');


/*demandeAdoption*/
INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('2', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('3', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');


/*passageRefuge*/
INSERT INTO `passageRefuge` (`date`, `heureDebut`, `heureFin`, `mailBenevole`, `description`)
VALUES ('2023-04-01 00:00:00', '10:00:00', '12:00:00', 'user@gmail.com', "Je vais faire le ménage");

INSERT INTO `passageRefuge` (`date`, `heureDebut`, `heureFin`, `mailBenevole`, `description`)
VALUES ('2023-04-02 00:00:00', '10:00:00', '12:00:00', 'user@gmail.com', "Je vais faire le ménage");

INSERT INTO `passageRefuge` (`date`, `heureDebut`, `heureFin`, `mailBenevole`, `description`)
VALUES ('2023-04-03 00:00:00', '10:00:00', '12:00:00', 'user@gmail.com', "Je vais faire le ménage");


/*evenement*/
INSERT INTO `evenement` (`id`, `titre`, `description`, `date`, `heureDebut`, `heureFin`)
VALUES ('1', 'Fête des chats', 'La fete avec pleins de chats', '2023-04-01', '10:00:00', '14:30:00');

INSERT INTO `evenement` (`id`, `titre`, `description`, `date`, `heureDebut`, `heureFin`)
VALUES ('2', 'Fête des chien', 'La fete avec pleins de chien', '2023-04-02', '10:00:00', '14:30:00');

/*concerne*/
INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('2', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('3', '3');

/*conseils*/
INSERT INTO `conseils` (`name`, `description`)
VALUES ('Mal_de_ventre', 'Toi aussi ton chat a mal au ventre, regarde cette astuce de genie pour lui couper les couilles, plus de couille plus de probleme');

INSERT INTO `conseils` (`name`, `description`)
VALUES ('Mal_de_tete', 'Toi aussi ton chat a mal a la tete, regarde cette astuce de genie pour lui couper les couilles, plus de couille plus de probleme');

INSERT INTO `conseils` (`name`, `description`)
VALUES ('Mal_de_pattes', 'Toi aussi ton chat a mal au pattes, regarde cette astuce de genie pour lui couper les couilles, plus de couille plus de probleme');



/*Exemples demandes en plus*/

/*demandeAdoption*/

/*Nouvelles demandes*/
INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('4', '2023-05-05 16:12:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('5', '2023-05-05 12:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('6', '2022-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('7', '2022-10-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('8', '2023-04-27 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('9', '2023-03-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('10', '2023-04-20 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('11', '2023-04-13 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('12', '2023-05-03 00:47:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('13', '2020-05-05 12:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('14', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('15', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('16', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('17', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '1', '', '', '', '');

/*Demandes en cours*/
INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('35', '2023-05-04 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('36', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('37', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('38', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('39', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('50', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('100', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('110', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('120', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('130', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('140', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('427', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('500', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('999', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '2', '', '', '', '');

/*Demandes traitées*/
INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1000', '2023-05-04 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1100', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1200', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1300', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1400', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1500', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('1666', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('10000', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('15264', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('20000', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('50000', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('75000', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('99999', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Maison', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

INSERT INTO `demandeAdoption` (`id`, `date`, `nom`, `prenom`, `mail`, `tel`, `adresse`, `habitation`, `exterieur`, `sortie`, `situationFamiliale`, `animaux`, `commentaire`, `statutDemande`, `memo`, `datePv`, `resultatPv`, `dateRencontre`)
VALUES ('100000', '2023-04-01 00:00:00', 'Dupont', 'Jean', 'jean.dupont@gmail.com', '0606060606', '1 rue de la paix', 'Appartement', '1', '1', 'Célibataire', 'Aucun', 'Je souhaite avoir ce chat car il est trop mignon', '3', '', '', '', '');

/*concerne*/
INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('4', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('5', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('6', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('7', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('8', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('9', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('10', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('11', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('12', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('13', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('14', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('15', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('16', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('17', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('35', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('36', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('37', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('38', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('39', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('50', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('100', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('110', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('120', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('130', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('140', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('427', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('500', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('999', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1000', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1100', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1200', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1300', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1400', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1500', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('1666', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('10000', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('15264', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('20000', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('50000', '2');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('75000', '3');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('99999', '1');

INSERT INTO `concerne`( `idDemande`, `codeChat`)
VALUES ('100000', '2');
