import { Injectable } from '@angular/core';

@Injectable()
export class LuhnService {
    constructor() { }

    // Réalisé via l'agorithme : 
    // https://fr.wikipedia.org/wiki/Formule_de_Luhn

    checkLuhn(creditcard: string): boolean {
        // Si le numéro de carte comporte un caractère autre qu'un chiffre, un espace ou un tiret 
        if (/[^0-9-\s]+/.test(creditcard)) {
            return false;
        }

        let check: number = 0;
        let digit: number = 0;
        let even: boolean = false;

        // supprime tout ce qui n'est pas un chiffre
        creditcard = creditcard.replace(/\D/g, "");

        for (let position = creditcard.length - 1; position >= 0; position--) {
            // base de 10 utilisée pour le parsing
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