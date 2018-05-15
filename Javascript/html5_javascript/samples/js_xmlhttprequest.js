function dataHandler(event) {
    var xhr = event.target;
    // si les données sont chargées ET le code de retour HTTP == 200 ...
    if (xhr.readyState == 4 && xhr.status == 200) {
        // affiche les données retournées par le serveur
        console.log(xhr.responseText);
    }
}
//  création d'un objet de type XMLHttpRequest
var xhr = new XMLHttpRequest();

//crée une requête HTTP asynchrone (UI non bloquée)
xhr.open("GET", "http://www.monsite.com/maressource", true);

// on précise la fonction à déclencher au moment ou le serveur 
// nous retournera les données
xhr.addEventListener("load", dataHandler, true)

// et on termine l'envoi de notre requête
xhr.send();

