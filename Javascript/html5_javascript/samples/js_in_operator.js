var tab = ["New York"];

// affiche true
console.log(0 in tab);

// affiche false car il n'existe pas d'éléments à l'indice 1 dans le tableau
console.log(1 in tab);

// affiche true, length est une propriété des objets de type tableau
console.log("length" in tab)

// on peut utiliser l'opérateur in dans une boucle for .. in 
var obj = { "age": 40, "name": "Dark Vador" }, prop = null;
for (prop in obj) {

    // affiche tour à tour "age" et "name"
    console.log(prop);
}