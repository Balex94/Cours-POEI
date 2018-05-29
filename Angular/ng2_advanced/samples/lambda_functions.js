function launchFunc(p_function) {
    p_function();
}

// ecma 5 style anonymous function
launchFunc(
    function () {
        console.log("I am The Sith Lord")
    }
);

// ecma6 arrow function
launchFunc(
    () => { console.log("I am The Sith Lord") }
);