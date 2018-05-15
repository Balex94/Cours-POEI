function keyDownHandler(event){
    console.log("appui sur une touche");
}
window.addEventListener("keydown", keyDownHandler, true);


function clickHandler(event){
    console.log("click souris");
}

window.addEventListener("click", clickHandler, true);