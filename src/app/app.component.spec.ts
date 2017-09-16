import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LuhnService } from './services/luhn.service';
import { CreditcardService } from './services/creditcard.service';
import { LuhnValidator } from './validators/luhn.validator';

import { CreditcardDetailComponent } from './forms/creditcard-detail.component';


import { HttpModule } from '@angular/http';
import { Http, Response } from '@angular/http';
import { AppSettings } from './app.settings';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should create the CreditcardDetailComponent', async(() => {
    const fixture = TestBed.createComponent(CreditcardDetailComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Order now');
  }));
});
