// retourne un objet jQuery contenant l'ensemble des élements 
// portant la classe sith_lord au sein d'élement portant l'id empire
$("#empire .sith_lord");

// récupère l'ensemble des guerriers dont le nom est obiwan ... 
$("#alliance .warriors[name='obiwan']");

// retourne tout les élements contenus dans l'empire
$("#empire *");

// on peut également employer plusieurs sélecteurs à la fois
$("#empire .sith_lord", "#empire *");