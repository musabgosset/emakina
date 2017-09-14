import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LuhnService } from '../services/luhn.service';

@Injectable()
export class LuhnValidator {

    constructor(private luhnService: LuhnService) { }

    ValidateLuhn(control: AbstractControl) {
        return !this.luhnService.checkLuhn(control.value) ? { 'luhnFailed': { value: control.value } } : null;
    }

}   