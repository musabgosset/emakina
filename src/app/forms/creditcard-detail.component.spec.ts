import { TestBed, async } from '@angular/core/testing';
import { CreditcardDetailComponent } from './creditcard-detail.component';
import { LuhnService } from '../services/luhn.service';
import { CreditcardService } from '../services/creditcard.service';
import { LuhnValidator } from '../validators/luhn.validator';

import { ReactiveFormsModule } from '@angular/forms';

import { Http, Response } from '@angular/http';
import { AppSettings } from '../app.settings';

import { HttpModule } from '@angular/http';

describe('CreditcardDetailComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreditcardDetailComponent 
      ],
      imports: [
        ReactiveFormsModule,
        HttpModule        
      ],
      providers: [ 
        LuhnService,
        CreditcardService,
        LuhnValidator
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
     // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = fixture.debugElement.componentInstance;    
    // Assert
    expect(app).toBeTruthy();
  }));
  
  it('wrong card number should not be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    app.creditcardForm.controls['number'].setValue('987547887754');
    // Assert
    expect(app.creditcardForm.get('number').errors).not.toEqual(null);
  }));

  it('too small card number should not be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    app.creditcardForm.controls['number'].setValue('1234');
    // Assert
    expect(app.creditcardForm.get('number').errors).not.toEqual(null);
  }));

  it('too large card number should not be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    app.creditcardForm.controls['number'].setValue('1234545757878979797975456785757545');
    // Assert
    expect(app.creditcardForm.get('number').errors).not.toEqual(null);
  }));

  it('good Visa card number should be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    app.creditcardForm.controls['number'].setValue('4242424242424242');
    // Assert
    expect(app.creditcardForm.get('number').errors).toEqual(null);
  }));

  it('good Mastercard card number should be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    app.creditcardForm.controls['number'].setValue('5404000000000001');
    // Assert
    expect(app.creditcardForm.get('number').errors).toEqual(null);
  }));

  it('good American Express card number should be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    app.creditcardForm.controls['number'].setValue('375811111111115');
    // Assert
    expect(app.creditcardForm.get('number').errors).toEqual(null);
  }));


  it('check luhn algorithm with invalid card number', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    // number from https://datacash.custhelp.com/app/answers/detail/a_id/776/~/the-luhn-check
    app.creditcardForm.controls['number'].setValue('4444333322221110');
    // Assert
    expect(app.creditcardForm.get('number').errors).not.toEqual(null);
  }));

  it('check luhn algorithm with valid card number', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    // number from https://datacash.custhelp.com/app/answers/detail/a_id/776/~/the-luhn-check
    app.creditcardForm.controls['number'].setValue('4444333322221111');
    // Assert
    expect(app.creditcardForm.get('number').errors).toEqual(null);
  }));

  it('check form validity with valid data', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    // number from https://datacash.custhelp.com/app/answers/detail/a_id/776/~/the-luhn-check
    app.creditcardForm.controls['number'].setValue('4444333322221111');
    app.creditcardForm.controls['name'].setValue('John Doe');
    app.creditcardForm.controls['ccv'].setValue('487');
    app.creditcardForm.controls['expiracyDate'].setValue('06/2015');
    // Assert
    expect(app.creditcardForm.valid).toBe(true);
  }));

  it('check form validity with invalid data', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    // Act
    app.creditcardForm.controls['number'].setValue('578547845');
    app.creditcardForm.controls['name'].setValue('John Doe');
    app.creditcardForm.controls['ccv'].setValue('');
    app.creditcardForm.controls['expiracyDate'].setValue('06/2015');
    // Assert
    expect(app.creditcardForm.valid).toBe(false);
  }));

});