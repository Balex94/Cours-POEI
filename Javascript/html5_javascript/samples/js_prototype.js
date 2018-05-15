function Personnage(){}

// création d'une propriété name sur le prototype
Personnage.prototype.name = "no_name";

// crée un objet de 'type' Personnage 
var santa = new Personnage();

// retourne no_name (valeur par défaut), la propriété existe !
console.log(santa.name); 