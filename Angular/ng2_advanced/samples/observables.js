Rx.Observable.create(function(observer) {
    setTimeout(() => observer.next("valeur A"), 700);
    setTimeout(() => observer.next("valeur B"), 400);
})
 .subscribe(e => console.log(e));

 // affiche "valeur A", puis "valeur B"  dans la console