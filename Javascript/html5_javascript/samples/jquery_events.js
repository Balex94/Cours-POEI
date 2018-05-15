function whoIsTheSithLord(event) {
    // imprime dark vador dans la console
    console.log(event.target.id);
    // enlève l'écouteur d'évènement
    $("#dark_vador").unbind("click", whoIsTheSithLord);
}

// ajoute un écouteur d'évènement pour le click 
$("#dark_vador").bind("click", whoIsTheSithLord);