// System
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
// App
import { CountriesDataService } from '../services/api/countries-data.service';
import { CountriesActions } from './countries.actions';
import { CitiesActions } from './cities.actions';
import { CountryHttpResponseInterface } from '../models/countryHttpResponse.interface';
import { CitiesHttpResponseInterface } from '../models/citiesHttpResponse.interface';

@Injectable()
export class CountriesCitiesEffects {

  constructor(private readonly actions$: Actions,
              private readonly countriesDataService: CountriesDataService) {
  }

  loadCountries$ = createEffect(() => this.actions$.pipe(
    ofType(CountriesActions.loadCountries),
    switchMap(() => this.countriesDataService.getCountriesAndCapitals().pipe(
      map((response: CountryHttpResponseInterface) => CountriesActions.countriesLoaded({countries: response.data}))
    ))
  ));

  loadCitiesByCountry$ = createEffect(() => this.actions$.pipe(
    ofType(CitiesActions.loadCitiesByCountry),
    switchMap(({countryName}) => this.countriesDataService.getCountryCities(countryName).pipe(
      map((response: CitiesHttpResponseInterface) => CitiesActions.citiesByCountryLoaded({countryName, cities: response.data}))
    ))
  ));

}
