/*
* Fournit un Pipe qui prend en charge un tableau de données numériques 
* et retourne une moyenne de ces données numériques
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'average' })
export class AveragePipe implements PipeTransform {
    transform(values: number[] ): number {
        let avg:number = 0; 
        let i:number = values.length;

        while( --i > -1 )
        {
            avg += values[i];
        }

        return avg / values.length;
    }
}