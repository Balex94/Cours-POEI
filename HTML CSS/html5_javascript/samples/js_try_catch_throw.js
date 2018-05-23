// on essaie d'éxécuter le code contenu dans le bloc try ...
try {
    // ... code potentiellement à risque.
}
catch (error) {
    //  mais une erreur peut se produire et être jetée dans ce cas on l'attrape avec catch
    console.log(error);
}


// on peut également jeter nos propres erreurs à l'aide de l'opérateur throw
throw (new Error("This is an error, don't do that again !"));