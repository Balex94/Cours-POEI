function whoIsTheSithLord() {
    console.log(this.name);
}

var sith_lord = {
    name: "Dark Vador"
};

// invoque la fonction, l'opérateur this pointera vers l'objet sith_lord
whoIsTheSithLord.apply(sith_lord);