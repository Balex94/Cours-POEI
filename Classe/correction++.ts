class Projecteur{

    private isOn: boolean = false;
    private typentree : string = "HDMI";
    private affichage: Array<string>= ["4/3", "16/9", "portrait", "paysage"]; 
    private volume:number=0;
    private i: number=0;
 
    public receiveSignal(param_signal:string)
    {
 
     if (param_signal=="OnOFF")
     {
         this.isOn= !this.isOn;
 
     }
     else if (param_signal=="entree")
     {
         if (this.typentree== "HDMI"){
          this.typentree ="VGA";
         }
         else if (this.typentree== "VGA"){
          this.typentree ="HDMI";
         }
     }
     else if (param_signal=="affichage")
     { 
        if (this.i < this.affichage.length-1){
         this.i=this.i+1;
        }
        else {
            this.i=0;
        }
     }
     else if (param_signal=="son+")
     {
         if (this.volume<20){
             this.volume+=1;
         }
     }
     else if (param_signal=="son-")
     {
         if (this.volume>0){
             this.volume-=1;
         }
         
     }
 
    }
    public isProjectorOn():boolean{
        return this.isOn;
    }
    public projectorTypeEntree ():string{
        return this.typentree;
    }
    public projectorDisplay():string {
         return this.affichage[this.i];
    }
    public projectorVolume():number {
         return this.volume;
    }
         
    
 }
 
 class Telecommande {   
    
     public signalOnOff(param_proj:Projecteur)
     {
      param_proj.receiveSignal("OnOff");
     }
    public signalEntree(param_proj:Projecteur)
    {
         param_proj.receiveSignal("entree");
    }
    public modeAffichage (param_proj:Projecteur)
    {
     param_proj.receiveSignal("affichage");
    }
    public volumeSonoreplus (param_proj:Projecteur)
    {
     param_proj.receiveSignal("son+");
    }
    public volumeSonoremoins (param_proj:Projecteur)
    {
     param_proj.receiveSignal("son-");
    }
   
      
 }
 
 
 let proj1: Projecteur= new Projecteur();
 let telecom: Telecommande = new Telecommande();