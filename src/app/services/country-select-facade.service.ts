// System
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../store/countries-cities.reducer';
// App
import { CountriesCitiesSelector } from '../store/countries-cities.selector';
import { CountryInterface } from '../models/country.interface';
import { CountriesActions } from '../store/countries.actions';
import { CitiesActions } from '../store/cities.actions';

@Injectable()
export class CountrySelectFacadeService {
  readonly selectAllCities$ = this.store.select(CountriesCitiesSelector.selectAllCities);
  readonly selectSelectedCities$ = this.store.select(CountriesCitiesSelector.selectSelectedCities);
  readonly selectAllCitiesAmount$ = this.store.select(CountriesCitiesSelector.selectAllCitiesAmount);
  readonly selectSelectedCitiesAmount$ = this.store.select(CountriesCitiesSelector.selectAllCitiesAmount);
  readonly selectCitiesByCountriesList$ = (countryList: Array<CountryInterface>) => this.store.select(CountriesCitiesSelector.selectCitiesByCountriesList(countryList));
  readonly selectCitiesByCountry$ = (country: string) => this.store.select(CountriesCitiesSelector.selectCitiesByCountry(country));

  readonly selectAllCountries$ = this.store.select(CountriesCitiesSelector.selectAllCountries);
  readonly selectAllCountriesAmount$ = this.store.select(CountriesCitiesSelector.selectAllCountriesAmount);
  readonly selectSelectedCountries$ = this.store.select(CountriesCitiesSelector.selectSelectedCountries);
  readonly selectSelectedCountriesAmount$ = this.store.select(CountriesCitiesSelector.selectSelectedCountriesAmount);


  constructor(private readonly store: Store<State>) {}

  loadCountries(): void {
    this.store.dispatch(CountriesActions.loadCountries());
  }

  loadCitiesByCountry(countryName: string): void {
    this.store.dispatch(CitiesActions.loadCitiesByCountry({countryName}));
  }

  setSelectedCountries(selectedCountries: Array<CountryInterface>): void {
    this.store.dispatch(CountriesActions.setSelectedCountries({selectedCountries}));
  }

  setSelectedCities(selectedCities: Array<string>): void {
    this.store.dispatch(CitiesActions.setSelectedCities({selectedCities}));
  }
}
