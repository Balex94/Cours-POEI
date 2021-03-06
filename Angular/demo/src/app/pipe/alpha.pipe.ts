import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../bean/product';

@Pipe({
  name: 'alpha'
})
export class AlphaPipe implements PipeTransform {

  transform(value: Array<Product>, p_name:string): Array<Product> {

    let i:number = 0;
    const max:number = value.length;
    const results:Array<Product> = new Array<Product>();

    for(i=0 ; i<max ; i++){
        if(value[i].title.indexOf(p_name) > -1){
          results.push(value[i])
        }
    }
 
    return results;
  }

}
