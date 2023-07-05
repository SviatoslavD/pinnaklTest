// System
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
// Components
import { AppComponent } from './app.component';
import { CountriesSelectorComponent } from './components/countries-selector/countries-selector.component';
import { CountriesSelectorStoreComponent } from './components/country-select-store/countries-selector-store.component';
// Services
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { countriesCitiesReducer } from './store/countries-cities.reducer';
import { CountriesCitiesEffects } from './store/countries-cities.effects';
import { CountriesDataService } from './services/api/countries-data.service';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CountrySelectFacadeService} from './services/country-select-facade.service';

@NgModule({
  declarations: [
    AppComponent,
    CountriesSelectorStoreComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CountriesSelectorComponent,

    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,

    StoreModule.forRoot({ countries: countriesCitiesReducer }),
    EffectsModule.forRoot([ CountriesCitiesEffects ])
  ],
  providers: [ CountriesDataService, CountrySelectFacadeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
