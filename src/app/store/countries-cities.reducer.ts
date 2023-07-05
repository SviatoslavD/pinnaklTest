// System
import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity'
// App
import { CitiesActions } from './cities.actions';
import { CountriesActions } from './countries.actions';
import { CountryInterface } from '../models/country.interface';
import { CitiesHttpResponseInterface } from '../models/citiesHttpResponse.interface';
import { CountryHttpResponseInterface } from '../models/countryHttpResponse.interface';

export interface State {
  countries: Array<CountryInterface>;
  cities: Array<string>;
  citiesByCountries: Map<string, Array<string>>;
  selectedCities: Array<string>;
  selectedCountries: Array<CountryInterface>;
};

export const initialState: State = {
  countries: [],
  cities: [],
  citiesByCountries: new Map<string, Array<string>>(),
  selectedCities: [],
  selectedCountries: []
};

export const storeAdapter: EntityAdapter<State> = createEntityAdapter<State>();

export const storeInitialState: State = storeAdapter.getInitialState(initialState);

export const countriesCitiesReducer = createReducer(
  storeInitialState,
  on(CountriesActions.countriesLoaded, (state, {countries}) => ({
    ...state,
    countries: [...countries]
  })),
  on(CitiesActions.citiesByCountryLoaded, (state, {countryName, cities}) => {
    return {
      ...state,
      citiesByCountries: {...state.citiesByCountries.set(countryName, cities)}
    }
  }),
  on(CitiesActions.setSelectedCities, (state, {selectedCities}) => {
    const newSelectedCities: Array<string> = [];
    for (const countryIndex in state.selectedCountries) {
      const countryName = state.selectedCountries[countryIndex].name;
      const citiesByCountry =  state.citiesByCountries instanceof Map ? state.citiesByCountries.get(countryName) : [];

      if (!citiesByCountry) break;

      for (const cityIndex in selectedCities) {
        const match = citiesByCountry.find((city: string) => city === selectedCities[cityIndex]);
        if (match) newSelectedCities.push(match);
      }
    }

    return {
    ...state,
      selectedCities: [...newSelectedCities]
    }
  }),
  on(CountriesActions.setSelectedCountries, (state, {selectedCountries}) => {
    return {
      ...state,
      selectedCountries: [...selectedCountries]
    }
  })
);
