// ici la variable warrior a une durée de vie limitée, 
// qui est celle de la directive structurelle *ngFor, 
// en de dehors de l'élement hôte ( la div ), la variable warrior
// sera inaccessible
<div *ngFor="let warrior of jedis">{{warrior.name}}</div>