function fileHandler(event) {
    //récupère une liste de fichiers de type FileList
    var files = event.target.files;
    var i = files.length;
    var reader = null;

    while (--i > -1) {

        // création d'un nouvel objet de type FileReader
        reader = new FileReader();
        // quand le fichier sera lu et le contenu disponible, fileHandler sera invoquée.
        reader.addEventListener("loadend", fileHandler);
        // readAsDataURL récupère le contenu du fichier encodé en base64
        reader.readAsDataURL(files[i]);
    }
}

function fileDataHandler(event) {
    // récupère le contenu du fichier encodé en base64
    var base64Data = event.target.result;
}