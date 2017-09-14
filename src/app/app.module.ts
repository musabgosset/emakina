import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreditcardDetailComponent } from './forms/creditcard-detail.component';

import { CreditcardService } from './services/creditcard.service';
import { LuhnService } from './services/luhn.service';
import { LuhnValidator } from './validators/luhn.validator';


@NgModule({
  declarations: [
    AppComponent,
    CreditcardDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ CreditcardService, LuhnService, LuhnValidator ],
  bootstrap: [ AppComponent ] 
})
export class AppModule { }


