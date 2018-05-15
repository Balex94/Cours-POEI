// cette fonction nommée saySomething affiche une boîte de dialogue 
// contenant le message contenu dans le paramètre p_msg, elle fait appel 
// à une fonction Javascript nommée alert.

function saySomething(p_msg) {
    alert(p_msg);
}

// cette fonction ne porte pas de nom, on dit qu'elle est anonyme.
// ici, elle est stockée dans une variable nommée myfunc
var myfunc = function () {
    alert("anonymous function");
};

/// invoque la fonction saySomething et affiche une boite de dialogue
saySomething("Hello World");

// invoque la fonction anonyme à l'aide de la variable myfunc
myfunc();
