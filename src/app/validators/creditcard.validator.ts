import { AbstractControl } from '@angular/forms';


export function ValidateCreditcard(control: AbstractControl) {

    const isValidVisa = control.value.startsWith("4") && control.value.length >= 13 &&  control.value.length <= 16;
    const isValidMastercard =  control.value.startsWith("5") && control.value.length == 16;    
    const isValidAmericanExpress =  (control.value.startsWith("34") || control.value.startsWith("37")) && control.value.length == 15;


    return (!isValidVisa && !isValidMastercard && !isValidAmericanExpress) ? { 'forbiddenCreditCardNumber': { value: control.value } } : null;
}

