class Personnage {
    constructor() {
        this.name = "";
    }

    sayMyName() {
        console.log(this.name);
    }
}

class JediKnight extends Personnage {
    constructor(p_name) {
        this.power = 250;
        this.name = p_name;
    }
}

let obiwan = new JediKnight("Obiwan Kenobi");
obiwan.sayMyName();