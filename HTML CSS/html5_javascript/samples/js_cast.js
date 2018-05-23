var age = "30.5";

// convertit la chaîne en nombre flottant
console.log(parseFloat(age));

// convertit la chaîne en nombre entier 
console.log(parseInt(age));

// conversion implicite de données, le type le plus complexe (String)
// va être automatiquement converti en (Number) par Javascript 
console.log( age == 30.5 ); 