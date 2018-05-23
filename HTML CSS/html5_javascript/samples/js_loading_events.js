function onPageFullyLoaded(event){
    console.log("HTML & other ressources fully loaded");
}

function onHTMLFullyLoaded(event){
    console.log("HTML fully loaded");
}

window.addEventListener("load", onPageFullyLoaded, false );
window.document.addEventListener("DOMContentLoaded", onHTMLFullyLoaded, false);