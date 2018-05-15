class Command{

    public bouton:boolean = true;

}

class Projecteur{

    public allumer(telecommande:Command){
        if(telecommande.bouton == true){
            console.log("J'allume le projecteur");
        }
        else{
            console.log("J'éteints le projecteur");
        }
    }       
}

let projo:Projecteur = new Projecteur();
let telecommande:Command = new Command();

projo.allumer(telecommande);

telecommande.bouton = false;

projo.allumer(telecommande);

