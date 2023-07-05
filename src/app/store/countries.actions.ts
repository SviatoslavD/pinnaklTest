// System
import { createAction, props } from '@ngrx/store';
// App
import { CountryInterface } from '../models/country.interface';

export namespace CountriesActions {
  export const loadCountries = createAction('[Country] Load Countries');
  export const countriesLoaded = createAction('[Country] Countries Loaded', props<{countries: Array<CountryInterface>}>());
  export const setSelectedCountries = createAction('[Country] Set Selected Countries', props<{selectedCountries: Array<CountryInterface>}>());
}
