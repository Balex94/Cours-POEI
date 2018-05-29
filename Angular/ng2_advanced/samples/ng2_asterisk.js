<div *ngIf="jedi">{{jedi.name}}<</div>
//....

<div template="ngIf jedi">{{jedi.name}}</div>

//.....

<ng-template [ngIf]="hero">
  <div>{{hero.name}}</div>
</ng-template>
