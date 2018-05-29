import { Component }          from '@angular/core';
import { JediService }        from './jedi.service';

@Component({
  selector: 'jedi',
  providers: [JediService],
  template: "Jedi master !"
})
export class JediComponent { 
    constructor(p_service:JediService){
        
    }
}