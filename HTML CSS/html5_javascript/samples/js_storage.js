// stocke une donn�e dont la cl� est "name" et la 
// valeur "Dark Vador" en session
sessionStorage.setItem("name", "Dark Vador");

// r�cup�re la valeur de session et l'affiche dans la console
console.log(sessionStorage.getItem("name"));

// stocke une donn�e dont la cl� est "realname" et la 
// valeur "Anakin Skywalker" de fa�on permanente
localStorage.setItem("realname", "Anakin Skywalker Vador");

// r�cup�re la valeur permanente et l'affiche dans la console
console.log(localStorage.getItem("realname"));