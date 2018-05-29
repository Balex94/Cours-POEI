function whoIsTheSithLord(p_padawan) 
{
    var sith_lord = "Palpatine";

    if (p_padawan === true ) 
    {
        let padawan = "Dark Vador";
    }

    console.log(sith_lord); // displays Palpatine
    console.log(padawan); // undefined

    //la variable padawan existe uniquement dans le bloc conditionnel, 
    // à l'inverse de sith_lord.
}

whoIsTheSithLord(true);