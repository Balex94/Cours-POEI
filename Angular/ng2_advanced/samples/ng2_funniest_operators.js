/*  
    interval: crée un observable qui va produire un entier qui s'incrémente
    toutes les x millisecondes.

    do: un opérateur n'ayant aucune influence sur le flux de données, utilisé
    dans le but de vérifier certaines informations ou d'effectuer une action parralèle

    map: même opérateur qu'en javascript es6, opère un traitement sur chacune 
    des valeurs retournées.

    take: permet de limiter la production de données, infinie par défaut, d'un 
    observable crée à l'aide d'"interval".
*/
let msg = "STAR WARS VII: The Force Awakens";
let obs = Observable.interval(100) 
                    .map( (val) => msg[val])
                    .do( 
                        (val) => {
                            document.body.innerHTML += val;
                        } 
                    )
                    .take(msg.length);