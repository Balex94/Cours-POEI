// cette variable devient automatiquement une propriété de l'environnement
// dans lequel elle est définie (window) et est donc disponible dans tout
// les environnements "enfants"
var sith_lord = "Dark Vador";

function whoIsTheSithLord(){
    // affiche Dark Vador dans la console
    console.log(sith_lord);
}

whoIsTheSithLord();