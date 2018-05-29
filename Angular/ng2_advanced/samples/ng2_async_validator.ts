import { Directive, forwardRef } from "@angular/core";
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
@Directive({
    selector: '[isAdult][ngModel],[isAdult][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => IsAdultValidator), multi: true }
    ]
})
export class IsAdultValidator {

    constructor() { }

    validate(control: AbstractControl) {
        return new Observable(observer => {
            if ( parseInt(control.value >= 18) ) {
                observer.next(  { asyncInvalid: true }  );
            } else {
                observer.next(null);
            }
        });
    }
}