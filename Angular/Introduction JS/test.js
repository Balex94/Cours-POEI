class Personnage {
    constructor() {
        this.name = "Obiwan Kenobi";
    }

    sayMyName() {
        console.log(this.name + " " + this.power);
    }
}

class  Zigounette extends Personnage {
    constructor(p_name) {
    	super();
        this.power = "Grand maitre Jedi";
        this.name = p_name;
    }
}

let obiwan = new Zigounette("Zigounette");
obiwan.sayMyName();