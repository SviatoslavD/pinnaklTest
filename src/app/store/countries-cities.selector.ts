// System
import { createFeatureSelector, createSelector } from '@ngrx/store';
// App
import { State } from './countries-cities.reducer';
import {CountryInterface} from '../models/country.interface';

const selectStatisticsState = createFeatureSelector<State>('countries');

export namespace CountriesCitiesSelector {
  export const selectSelectedCities = createSelector(selectStatisticsState, (state: State) => state.selectedCities);
  export const selectSelectedCountries = createSelector(selectStatisticsState, (state: State) => state.selectedCountries);
  export const selectCitiesByCountriesList = (countryList: Array<CountryInterface>) => createSelector(selectStatisticsState, (state: State) => {
    let cities: Array<string> = [];
    let countryToLoadCities: string = '';
    for (const country of countryList) {
      // Get cities from state
      const loadedCities = state.citiesByCountries instanceof Map ? state.citiesByCountries.get(country.name) : [];
      if (loadedCities) {
        cities = [...cities, ...loadedCities];
      } else {
        // Country name not present in the state
        countryToLoadCities = country.name;
      }
    }

    return { cities, countryToLoadCities};
  });
  export const selectCitiesByCountry = (country: string) => createSelector(selectStatisticsState, (state: State) => {
    const loadedCities = state.citiesByCountries.get(country);
    return loadedCities ? [...loadedCities] : [];
  });
  export const selectAllCities = createSelector(selectStatisticsState, (state: State) => state.cities);
  export const selectAllCitiesAmount = createSelector(selectStatisticsState, (state: State) => state.cities.length);
  export const selectSelectedCitiesAmount = createSelector(selectStatisticsState, (state: State) => state.selectedCities.length);
  export const selectAllCountries = createSelector(selectStatisticsState, (state: State) => state.countries);
  export const selectAllCountriesAmount = createSelector(selectStatisticsState, (state: State) => state.countries.length);
  export const selectSelectedCountriesAmount = createSelector(selectStatisticsState, (state: State) => state.selectedCountries.length);
}
