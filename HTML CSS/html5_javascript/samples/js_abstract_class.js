//
// création d'une pseudo classe abstraite
function AbstractPersonnage() {
    if (this.constructor == AbstractPersonnage)
        throw (new Error("don't instanciate abstract class !"));
}

AbstractPersonnage.prototype.name = "no_name";

function Personnage() {
    AbstractPersonnage.apply(this); // call super constructor
}

// héritage ...
for (var prop in AbstractPersonnage.prototype) {
    Personnage.prototype[prop] = AbstractPersonnage[prop];
}

new Personnage(); // tout est ok
new AbstractPersonnage(); // jette une erreur
//