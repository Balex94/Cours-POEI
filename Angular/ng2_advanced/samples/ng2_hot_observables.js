// ici on crée un hot Observable, le producteur de données est crée
// en dehors du subscribe, en revanche, on évite de fournir une méthode 
// de désinscription qui détruira le producteur de données car d'autres observables
// être en fin d'écouter le même producteur.

let socket = new WebSocket('ws://someurl');

let source = new Observable(
    (observer) => {
        socket.addEventListener(
            'message',
            (e) => observer.next(e)
        );
    }
);