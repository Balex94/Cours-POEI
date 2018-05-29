@Component({
  selector: 'jedi',
  template: `<button (click)="toggle()">Change Side Force</button>`})
export class JediComponent {

  isOnTheDarkSide: boolean = true;
  @Output() dark: EventEmitter<any> = new EventEmitter();
  @Output() light: EventEmitter<any> = new EventEmitter();
 
  toggle() {

    this.isOnTheDarkSide = !this.isOnTheDarkSide;

    if (this.isOnTheDarkSide) {
      this.open.emit(null);
    } 
    else {
      this.close.emit(null);
    }
  }
}

//....

<jedi (dark)="darkHandler($event)" (light)="lightHandler"></jedi>