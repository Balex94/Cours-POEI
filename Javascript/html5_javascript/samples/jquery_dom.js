// supprime tout les enfants du noeud body
$("body").empty();

// ajoute un élement portant l'id 'empire' au noeud body
$("body").append('<div id="empire"></div>');

// ajoute une classe à l'élement précedemment ajouté
$("#empire").addClass("darkside");