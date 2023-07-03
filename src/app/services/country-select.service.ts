// System
import { Injectable } from '@angular/core';
// App
import { CountryStateService } from './country-state.service';
import { CountryInterface } from '../models/country.interface';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class CountrySelectService {

  private loadedCitiesSubjectAmountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  loadedCitiesSubjectAmount: Observable<number> = this.loadedCitiesSubjectAmountSubject.asObservable();

  constructor(private readonly countryStateService: CountryStateService) {}

  /**
   * Get cities for the countries from the store
   * @param {Array<CountryInterface>} selectedCountries
   * @param {Array<string>} cities
   * @return { cities: Array<string>, countryToLoadCities: string}
   */
  getCitiesForCountries(selectedCountries: Array<CountryInterface>,
                                cities: Array<string>): { cities: Array<string>, countryToLoadCities: string} {
    cities = [];
    let countryToLoadCities: string = '';
    for (const country of selectedCountries) {
      // Get cities from cache
      const loadedCities = this.countryStateService.getCitiesByCountry(country.name);
      if (loadedCities) {
        cities = [...cities, ...loadedCities];
      } else {
        countryToLoadCities = country.name;
      }
    }

    return { cities, countryToLoadCities};
  }

  /**
   * Get amount of all loaded cities from store
   */
  getAllLoadedCitiesAmount(): void {
    let totalAmount = 0;
    for (const cachedCities of this.countryStateService.allCitiesByCountries.values()) {
      totalAmount += cachedCities.length;
    }
    this.loadedCitiesSubjectAmountSubject.next(totalAmount);
  }

  /**
   * @param {Array<CountryInterface>} selectedCountries
   * @param {Array<string>} selectedCities
   */
  setSelectedCities(selectedCountries: Array<CountryInterface>, selectedCities: Array<string>): Array<string> {
    const selectedCitiesCopy = [...selectedCities];
    selectedCities = [];

    for (const countryIndex in selectedCountries) {
      const countryName = selectedCountries[countryIndex].name;
      const citiesByCountry = this.countryStateService.getCitiesByCountry(countryName);

      if (!citiesByCountry) break;

      for (const cityIndex in selectedCitiesCopy) {
        const match = citiesByCountry.find((city: string) => city === selectedCitiesCopy[cityIndex]);
        if (match) selectedCities.push(match);
      }
    }

    return selectedCities;
  }
}
