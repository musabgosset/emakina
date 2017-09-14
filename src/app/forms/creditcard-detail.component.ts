import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Creditcard } from '../models/credit-card'

import { ValidateCreditcard } from '../validators/creditcard.validator';
import { LuhnValidator } from '../validators/luhn.validator';
import { LuhnService } from '../services/luhn.service';

@Component({
    selector: 'creditcard-detail',
    templateUrl: 'creditcard-detail.component.html'
})

export class CreditcardDetailComponent implements OnInit {
    creditcard: Creditcard;

    creditcardForm: FormGroup;

    constructor(private luhnValidator: LuhnValidator, private fb: FormBuilder) {
        this.creditcard = new Creditcard();
        this.createForm();
    }
 
    createForm() : void {
        this.creditcardForm = this.fb.group({
            number: [this.creditcard.number, [Validators.required, ValidateCreditcard, this.luhnValidator.ValidateLuhn.bind(this.luhnValidator)]],
            name: [this.creditcard.name, Validators.required],
            ccv: [this.creditcard.ccv, Validators.required],
            expiracyDate: [this.creditcard.expiracyDate, Validators.required]
        });
    }

    checkCreditCard() : string {
        console.log(this.creditcardForm.value.number);
        if (!this.creditcardForm.value.number || this.creditcardForm.value.number == '')
            return undefined;

        if (this.creditcardForm.value.number.startsWith('4')) {
            return 'Visa';
        }
        else if (this.creditcardForm.value.number.startsWith('5')) {
            return 'Mastercard';
        }
        else if (this.creditcardForm.value.number.startsWith('34') || this.creditcardForm.value.number.startsWith('37')) {
            return 'American Express';
        }
        else return '?';    
    }

    prepareSaveCreditcard() : Creditcard {
        const formModel = this.creditcardForm.value;

        const saveCreditcard = {
            number: formModel.number,
            name: formModel.name,
            ccv: formModel.cvv,
            expiracyDate: formModel.expiracyDate
        };

        return saveCreditcard;
    }


    onSubmit() {
        const creditcard = this.prepareSaveCreditcard();

        console.log("Credit card : ", creditcard);
    }

    reset() {
        this.creditcardForm.reset(this.creditcard);
    }

    ngOnInit() { }
}