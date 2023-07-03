// System
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
// Components
import { AppComponent } from './app.component';
import { CountriesSelectorComponent } from './components/countries-selector/countries-selector.component';
// Services
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CountriesSelectorComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
