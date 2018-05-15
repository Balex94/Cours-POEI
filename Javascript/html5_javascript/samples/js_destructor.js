function Personnage() {
    // constructeur
}

// exemple fonction destructrice
Personnage.prototype.destroy = function () {
    // libère les propriétés de l'objet
}

// on crée un objet de type Personnage 
var anakin = new Personnage();

// invocation de destructeur + instance = null
anakin.destroy();
anakin = null;