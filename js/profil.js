function changerPhotoProfil(contexte){
    console.log(contexte);
    var form = contexte.parentNode;
    form.submit();
}

/**
 * 
 * Fonction qui retourne la liste des utilisateurs
 */
function listerUtilisateurs(){
    $SQL = "SELECT name FROM utilisateur";
    return parcoursRS(SQLSelect($SQL));
}

/**
 * fonction qui retourne le nom dse l'utilisateur courant
 */
function getNomUtilisateur($mail){
    $SQL = "SELECT name FROM utilisateur WHERE mail = '$mail'";
    return SQLGetChamp($SQL);
}

function changerNomUtilisateur($mail, $nom) {
    $nom = SQLProteger($nom);
    $SQL = "UPDATE utilisateur SET name = '$nom' WHERE mail = '$mail'";
    return SQLExec($SQL);
  }
