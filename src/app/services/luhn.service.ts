import { Injectable } from '@angular/core';

@Injectable()
export class LuhnService {
    constructor() { }

    checkLuhn(creditcard: string): boolean {
        if (/[^0-9-\s]+/.test(creditcard)) {
            return false;
        }

        let even: boolean = false;
        let check: number = 0;
        let digit: number = 0;

        creditcard = creditcard.replace(/\D/g, "");

        for (let position = creditcard.length - 1; position >= 0; position--) {
            digit = parseInt(creditcard.charAt(position), 10);

            if (even && (digit *= 2) > 9) {
                digit -= 9;
            }

            check += digit;
            even = !even;
        }
        
        let isValid = (check % 10) == 0;
    
        return isValid;
    }
}