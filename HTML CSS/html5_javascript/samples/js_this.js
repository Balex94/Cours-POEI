function Personnage(p_name) {
    this.name = p_name; // this = objet nouvellement crée
}
Personnage.prototype.name = "no_name";

Personnage.prototype.sayHello = function () {
    console.log(this.name);
};

var perso = new Personnage("Black Beard");

// ici, grâce à la syntaxe 'à point', Javascript va déterminer que le 
// contexte de la fonction est l'objet perso, this, pointera donc 
// vers le bon objet au sein de la méthode sayHello
perso.sayHello(); 

// ici, on stocke une 'référence' à la méthode sayHello et on l'utilise
// en faisant cela, on a crée une variable myfunc au sein de l'espace global
// ce qui en fait automatiquement une de ses propriétés
var myfunc = perso.sayHello;

// ici, appeler myfunc directement ou window.myfunc revient au même, 
// this pointera donc vers window au sein de la méthode sayHello
myfunc(); window.myfunc();
