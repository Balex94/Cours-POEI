@Component({
    template: `
      <h2>{{data.name}}</h2>
      <span>{{data.surname}}</span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  class WarriorComponent {
    
    @Input() data;

    constructor(private cd: ChangeDetectorRef) {}

    public changeName()
    {
        this.data.name = "Obiwan Kenobi";
        // en appellant la méthode markForCheck, Angular va réévaluer les valeurs associées 
        // au composant et relancer un rendu de ce dernier
        this.cd.markForCheck();
    }
  }