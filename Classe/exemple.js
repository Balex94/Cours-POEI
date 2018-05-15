var Command = /** @class */ (function () {
    function Command() {
        this.bouton = true;
    }
    return Command;
}());
var Projecteur = /** @class */ (function () {
    function Projecteur() {
    }
    Projecteur.prototype.allumer = function (telecommande) {
        if (telecommande.bouton == true) {
            console.log("J'allume le projecteur");
        }
        else {
            console.log("J'éteints le projecteur");
        }
    };
    return Projecteur;
}());
var projo = new Projecteur();
var telecommande = new Command();
projo.allumer(telecommande);
telecommande.bouton = false;
projo.allumer(telecommande);
