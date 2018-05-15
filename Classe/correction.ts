/*
* Ajouter la gestion du mode d'affichage ( 4/3, 16/9, portrait, paysage )
* Ajouter la gestion des entrées (HDMI, VGA)
* Ajouter la gestion du volume ( de 0 à 20 par pas de 1 )
*/

class Projecteur{

    private isOn:boolean = false;

    public receiveSignal( paramSignal:string ){
        
        if( paramSignal == "le_signal_allumage_extinction"){
            this.isOn = !this.isOn;
        }
        else if( paramSignal == "off"){
            this.isOn = false;
        }

    }

    public isProjectorOn():boolean{
        return this.isOn;
    }
}

class Telecommande{

    public signal(paramProj:Projecteur){
        paramProj.receiveSignal("le_signal_allumage_extinction");
    }

}

let myProjector:Projecteur = new Projecteur();
let myTeleCmd:Telecommande = new Telecommande();

myTeleCmd.signal(myProjector);
