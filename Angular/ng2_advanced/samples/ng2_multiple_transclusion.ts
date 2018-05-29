import { Component } from '@angular/core';

@Component({
  selector: 'jedi',
  template: `
    <div>
      <ng-content select="jediname"></ng-content>
      <ng-content select="jedisurname"></ng-content>
    </div>`
})
export class JediComponent {}
