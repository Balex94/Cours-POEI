// avance et recule d'un cran dans l'historique
window.history.back();
window.history.forward();

// avance et recule de  5 crans d'un coup dans l'historique
window.history.go(-5);
window.history.go(5);

// longueur de l'historique ...
console.log(window.history.length);

// pousse une nouvelle url au sein de l'historique & la page pouss�e est ouverte. 
// La m�thode "replaceState()" fait exactement la m�me chose � ceci pr�s qu'elle 
// remplace l'�tat courant.
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");

// donne l'�tat courant
console.log(window.history.state);