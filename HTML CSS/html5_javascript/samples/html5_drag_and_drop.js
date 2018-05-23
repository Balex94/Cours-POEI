// cette fonction de callback annule le comportement par défaut du navigateur 
// ( ouverture des fichiers ou rafraichissement de la page )
function cancelHandler(event) {
    event.stopPropagation();
    event.preventDefault();
}

function dropHandler(event) {
    e.stopPropagation();
    e.preventDefault();
    // on peut récupérer le tableau de fichier droppé par l'utilisateur à l'aide
    // de la propriété dataTransfer de l'objet event
    var files = event.dataTransfer.files;
}

// ici dropbox est l'élement html sur lequel l'utilisateur va dropper ses fichiers 
var dropbox = document.getElementById("dropbox");
dropbox.addEventListener("dragenter", cancelHandler, false);
dropbox.addEventListener("dragover", cancelHandler, false);
dropbox.addEventListener("drop", dropHandler, false);