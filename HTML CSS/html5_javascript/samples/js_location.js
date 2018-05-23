// affiche l'hôte, çàd une châine de la forme: domaine:port
console.log(window.location.host);

//affiche les paramètres çàd une chaîne: ?param=value&param=value
console.log(window.location.search);

//affiche l'url entière
console.log(window.location.href);

//recharge la page courante
window.location.reload();

//redirige vers la page monsite.fr
window.location.assign("http://monsite.fr");

//redirige vers la page monsite.fr, n'apparaîtra pas dans l'historique
window.location.replace("http://monsite.fr");