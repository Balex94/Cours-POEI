//script principal
var sith_lord = new Worker("dark_vador.js");
sith_lord.onmessage = function (event) {
    // affiche Dark Vador
    console.log(event.data);
};

sith_lord.postMessage("getsithlord");


// dark_vador.js
onmessage = function (event) {

    if (event.data == "getsithlord")
        postMessage("Dark Vador");
}
