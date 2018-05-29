// ici, à chaque fois que l'on appelle la méthode subscribe de l'observable
// on crée une connexion au serveur websocket et on renvoit une function
// permettant de refermer cette connexion

let obs = new Observable(

    (observer) => {
        let socket = new WebSocket('ws://someurl');
        socket.addEventListener(
            'message', 
            (data) => observer.next(data)
        );

        return () => socket.close();
    }
);