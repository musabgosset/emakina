import { TestBed, async, inject } from '@angular/core/testing';
import { LuhnService } from '../services/luhn.service';
import { CreditcardService } from '../services/creditcard.service';
import { LuhnValidator } from '../validators/luhn.validator';


import { Creditcard } from '../models/credit-card';

import { Http, Response, XHRBackend, HttpModule, ResponseOptions } from '@angular/http';
import { AppSettings } from '../app.settings';

import { MockBackend } from '@angular/http/testing';


describe('CreditcardService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
                HttpModule
            ],
            providers: [
                { provide: AppSettings.API_ENDPOINT, useValue: 'http://example.com' },
                LuhnService,
                CreditcardService,
                { provide: XHRBackend, useClass: MockBackend },
                LuhnValidator
            ]
        }).compileComponents();
    }));


    describe('checkCreditCard()', () => {
        it('Valid visa card number should return Visa', inject([CreditcardService], (service: CreditcardService) => {
            // Act
            const result = service.checkCreditCard("4556138571772548");
            // Assert
            expect(result).toBe('Visa');
        }));
        it('Valid mastercard card number should return Mastercard', inject([CreditcardService], (service: CreditcardService) => {
            // Act
            const result = service.checkCreditCard("5335767709822133");
            // Assert
            expect(result).toBe('Mastercard');
        }));
        it('Valid American Express card number should return American Express', inject([CreditcardService], (service: CreditcardService) => {
            // Act
            const result = service.checkCreditCard("370074494312827");
            // Assert
            expect(result).toBe('American Express');
        }));
        it('Invalid card number should return ?', inject([CreditcardService], (service: CreditcardService) => {
            // Act
            const result = service.checkCreditCard("987874747447");
            // Assert
            expect(result).toBe('?');
        }));
    });

    describe('saveCreditcard()', () => {
        it('should return a Creditcard', inject([CreditcardService, XHRBackend], (service: CreditcardService, mockBackend: MockBackend) => {
            // Arrange
            const creditcard = new Creditcard();
            creditcard.number = '4556138571772548';
            creditcard.ccv = '411';
            creditcard.name = 'Mickael Jordan';
            creditcard.expiracyDate = new Date('01/06/2019');

            const mockResponse = {
                data: creditcard
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            // Act
            service.saveCreditcard(creditcard).subscribe(() => {
                // Assert
                expect(creditcard.number).toBe('4556138571772548');
                expect(creditcard.ccv).toBe('411');
                expect(creditcard.name).toBe('Mickael Jordan');
                expect(creditcard.expiracyDate).toEqual(new Date('01/06/2019'));
            });

        }));
    });
});