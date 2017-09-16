import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { Creditcard } from '../models/credit-card';

import { Http, Response } from '@angular/http';
import { AppSettings } from '../app.settings';


@Injectable()
export class CreditcardService {
    public static VISA: string = "Visa";
    public static MASTERCARD: string = "Mastercard";
    public static AMERICAN_EXPRESS: string = "American Express";
    public static INVALID: string = "Invalid";
    public static UNKNOWN: string = "?";


    constructor(private http: Http) { }

    saveCreditcard(creditcard: Creditcard): Observable<Response> {
        return this.http
            .post(AppSettings.API_ENDPOINT + '/creditcards/add', creditcard).map(this.extractData);
    }

    checkCreditCard(number: string): string {
        if (!number) {
            return undefined;
        }
        else if (number.startsWith('4')) {
            return CreditcardService.VISA;
        }
        else if (number.startsWith('5')) {
            return CreditcardService.MASTERCARD;
        }
        else if (number.startsWith('34') || number.startsWith('37')) {
            return CreditcardService.AMERICAN_EXPRESS;
        }
        else if (number.length >= 13 && number.length <= 16) {
            return CreditcardService.INVALID;
        }
        else {
            return CreditcardService.UNKNOWN;
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
}