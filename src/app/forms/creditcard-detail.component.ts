import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Creditcard } from '../models/credit-card'

import { ValidateCreditcard } from '../validators/creditcard.validator';
import { LuhnValidator } from '../validators/luhn.validator';
import { LuhnService } from '../services/luhn.service';
import { CreditcardService } from '../services/creditcard.service';



@Component({
    selector: 'creditcard-detail',
    templateUrl: 'creditcard-detail.component.html'
})

export class CreditcardDetailComponent implements OnInit {
    submitted:boolean;
    creditcard: Creditcard;
    creditcardForm: FormGroup;

    constructor(private luhnValidator: LuhnValidator, private fb: FormBuilder, private creditCardService: CreditcardService) {
        this.submitted = false;
        this.creditcard = new Creditcard();
        this.createForm();
    }

    createForm(): void {
        this.creditcardForm = this.fb.group({
            number: [this.creditcard.number, [Validators.required, ValidateCreditcard, this.luhnValidator.ValidateLuhn.bind(this.luhnValidator)]],
            name: [this.creditcard.name, Validators.required],
            ccv: [this.creditcard.ccv, Validators.required],
            expiracyDate: [this.creditcard.expiracyDate, Validators.required]
        });
    }


    checkCreditCard(): string {
        return this.creditCardService.checkCreditCard(this.creditcardForm.value.number);
    }

    prepareSaveCreditcard(): Creditcard {
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
        this.creditCardService.saveCreditcard(creditcard).subscribe((result) => {
            this.submitted = true;
        }, error => { 
            alert("Something went wrong. Please retry.");
        });
    }

    reset() {
        this.creditcardForm.reset(this.creditcard);
    }

    ngOnInit() { }
}