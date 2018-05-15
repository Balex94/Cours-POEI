function reduce(action, tab, base) {
    for (var i = 0; i < tab.length; i++) {
        base = action(base, tab[i]);
    }
    return base;
}

function add(a, b){
    return a + b;
}

// nous retourne la somme des élements du tableau
console.log( reduce(add, [0,30,80,100], 0 ));