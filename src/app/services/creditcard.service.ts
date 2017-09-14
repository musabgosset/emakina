import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
 
import { Creditcard } from '../models/credit-card';

@Injectable()
export class CreditcardService {

    delayMs = 5000;

    constructor() { }

    saveCreditcard(creditcard: Creditcard): Observable<Creditcard>  {
        return of(creditcard).delay(this.delayMs); 
      }
}