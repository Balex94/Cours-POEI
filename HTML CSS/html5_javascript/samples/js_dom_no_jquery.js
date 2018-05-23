
// ici on cherche une référence à un élement par le biais de son attribut 'id'
var my_element = document.getElementById("element_id");

// ici on va chercher tout les élements <div> d'un document HTML
var my_divs = document.getElementsByTagName("div");

// pour les navigateurs plus récents, il est possible d'utiliser les sélecteurs CSS
// ici, on va chercher tout les élements disposant de la classe "code"
var my_elements = document.querySelectorAl(".code");

// il est possible de créer des noeuds...
var my_div = document.createNode("div");

// d'en insérer à l'intérieur d'autres noeuds...
my_div.appendChild(document.createNode("div"));

// de supprimer des enfants d'un noeud (ici my_node est une référence à un élement).
my_div.removeChild(my_node)


