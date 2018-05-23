function getSithLordFunc() {

    var sith_lord = "Dark Vador";
    function whoIsTheSithLord() {
        console.log(sith_lord);
    }

    return whoIsTheSithLord;
}
// retourne la fonction whoIsTheSithLord...
var func = getSithLordFunc();

// invoque la fonction whoIsTheSithLord qui se souvient
// de la variable sith_lord décrite dans le même contexte
func();