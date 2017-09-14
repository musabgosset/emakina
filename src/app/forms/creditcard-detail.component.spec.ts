import { TestBed, async } from '@angular/core/testing';
import { CreditcardDetailComponent } from './creditcard-detail.component';
import { LuhnService } from '../services/luhn.service';
import { LuhnValidator } from '../validators/luhn.validator';

import { ReactiveFormsModule } from '@angular/forms';

describe('CreditcardDetailComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreditcardDetailComponent 
      ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [ 
        LuhnService,
        LuhnValidator
      ]
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should write the name correctly', async(() => {
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;
    
    app.creditcardForm.controls['name'].setValue('test'); 
    expect(app.creditcardForm.controls['name'].value).toEqual('test');
  }));

  it('Wrong card number should not be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;

    // Act
    app.creditcardForm.controls['number'].setValue('987547887754');

    // Assert
    expect(app.creditcardForm.get('number').errors).not.toEqual(null);
  }));

  it('Good Visa card number should be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;

    // Act
    app.creditcardForm.controls['number'].setValue('4242424242424242');

    // Assert
    expect(app.creditcardForm.get('number').errors).toEqual(null);
  }));

  it('Good Mastercard card number should be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;

    // Act
    app.creditcardForm.controls['number'].setValue('5404000000000001');

    // Assert
    expect(app.creditcardForm.get('number').errors).toEqual(null);
  }));

  it('Good American Express card number should be valid', async(() => {
    // Arrange
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = <CreditcardDetailComponent>fixture.debugElement.componentInstance;

    // Act
    app.creditcardForm.controls['number'].setValue('375811111111115');

    // Assert
    expect(app.creditcardForm.get('number').errors).toEqual(null);
  }));
});