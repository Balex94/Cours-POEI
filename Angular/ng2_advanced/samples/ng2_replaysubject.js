function playSubject(p_subject) 
{
    subject.onNext("Jedi");

    subject.subscribe( 
        (data) => {
            console.log(data);
        }
    );

    subject.onNext("Obiwan");
    subject.onNext("Kenobi");
}
let subject1 = new Rx.Subject();
let subject2 = new Rx.ReplaySubject();

playSubject(subject1); // affiche: Obiwan Kenobi
playSubject(subject2); // affiche: Jedi Obiwan Kenobi