// Importe la classe Observable ainsi que 
// l'intégralité des opérateurs
import {Observable} from 'rxjs/RX';

// on peut créer un Observable à partir d'un jeu de données à l'aide d'opérateurs
let obs = Observable.from(["Dark Vador", "Obiwan", "Maître Yoda"]);
obs.subsribe(
    (character) => {
        console.log(character);
    }
);

// ou alors à l'aide de l'opérateur new
let obs = new Observable(
    (observer) => {
        observer.next("Chewbacca");
        observer.next("Han Solo");
        observer.next("Princesse Leïa");
    }
);