import { Component } from '@angular/core';

@Component({
  selector: 'jedi',
  template: `
    <div style="border: 1px solid blue; padding: 1rem;">
      <h4>Jedi Component</h4>
      <ng-content></ng-content>
    </div>`
})
export class JediComponent {}

// creates the component from the host component ... 
