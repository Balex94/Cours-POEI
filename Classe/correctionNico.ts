/*
* Ajouter la gestion du mode d'affichage ( 4/3, 16/9, portrait, paysage )
* Ajouter la gestion des entrées (HDMI, VGA)
* Ajouter la gestion du volume ( de 0 à 20 par pas de 1 )
*/

class ProjTelProtocol {
    public static TOGGLE_ON_OFF: string = "toggle_on_off";
    public static VOLUME_INC: string = "volume_inc";
    public static VOLUME_DEC: string = "volume_dec";
    public static HDMI_MODE: string = "hdmi_mode";
    public static VGA_MODE: string = "vga_mode";
    public static DISPLAY_4_3: string = "display_4_3";
    public static DISPLAY_16_9: string = "display_16_9";
    public static ORIENTATION_PORTRAIT: string = "orientation_portrait";
    public static ORIENTATION_PAYSAGE: string = "orientation_paysage";
}

class Projecteur {

    private isOn: boolean       = false;
    private volume:number       = 0;
    private orientation:string  = null;
    private source:string       = null;
    private displayMode:string  = null;

    private incVolume(){
        if( this.volume < 20)
            this.volume++;
    }

    private decVolume(){
        if( this.volume > 0 )
            this.volume--;
    }

    public getVolume():number{
        return this.volume;
    }

    public getOrientation():string{
        return this.orientation;
    }

    public getSource():string{
        return this.source;
    }

    public getDisplayMode():string{
        return this.displayMode;
    }

    public receiveSignal(paramSignal: string) {

        if (paramSignal == ProjTelProtocol.TOGGLE_ON_OFF) {
            this.isOn = !this.isOn;
        }

        // Si on n'est pas allumé, alors aucune chance d'interpréter un 
        // signal autre que l'allumage.
        if (this.isOn == false) {
            return;
        }



        switch (paramSignal) {

            case ProjTelProtocol.ORIENTATION_PAYSAGE:
            case ProjTelProtocol.ORIENTATION_PORTRAIT:
                this.orientation = paramSignal;
                break;

            case ProjTelProtocol.VOLUME_INC:
                this.incVolume();
                break;    
                
            case ProjTelProtocol.VOLUME_DEC:
                this.decVolume();
                break;

            case ProjTelProtocol.HDMI_MODE:
            case ProjTelProtocol.VGA_MODE:
                this.source = paramSignal;
                break;
            
            case ProjTelProtocol.DISPLAY_4_3:
            case ProjTelProtocol.DISPLAY_16_9:
                this.displayMode = paramSignal;
                break;

        }

    }

    public isProjectorOn(): boolean {
        return this.isOn;
    }
}

class Telecommande {

    public signalOnOff(paramProj: Projecteur) {
        paramProj.receiveSignal(ProjTelProtocol.TOGGLE_ON_OFF);
    }

    public signalVolumeInc(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.VOLUME_INC);
    }

    public signalVolumeDec(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.VOLUME_DEC);
    }

    public signalPortrait(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.ORIENTATION_PORTRAIT);
    }

    public signalPaysage(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.ORIENTATION_PAYSAGE);
    }

    public signal43(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.DISPLAY_4_3);
    }
    
    public signal169(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.DISPLAY_16_9);
    }

    public signalVGA(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.VGA_MODE);    
    }

    public signalHDMI(paramProj:Projecteur){
        paramProj.receiveSignal(ProjTelProtocol.HDMI_MODE);    
    }

}

let myProjector: Projecteur = new Projecteur();
let myTeleCmd: Telecommande = new Telecommande();

myTeleCmd.signalOnOff(myProjector);
myTeleCmd.signalPaysage(myProjector);
myTeleCmd.signalOnOff(myProjector);

console.log(myProjector.getOrientation() );
