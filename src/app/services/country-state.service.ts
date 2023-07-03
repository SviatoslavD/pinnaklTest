// System
import { Injectable } from '@angular/core';
import { CountryInterface } from '../models/country.interface';

@Injectable()
export class CountryStateService {

  private countries: Array<CountryInterface> = [];
  private cachedCitiesByCountries: Map<string, Array<string>> = new Map<string, Array<string>>();

  set setCountries(values: Array<CountryInterface>) {
    this.countries = values;
  }

  get getCountries(): Array<CountryInterface> {
    return this.countries;
  }

  get allCitiesByCountries(): Map<string, Array<string>> {
    return this.cachedCitiesByCountries;
  }

  /**
   * @param{string} key
   */
  getCitiesByCountry(key: string): Array<string> | undefined {
    return this.cachedCitiesByCountries.get(key);
  }

  /**
   * @param{string} key
   * @param{Array<string>} cities
   */
  storeLoadedCityByCountry(key: string, cities: Array<string>): void {
    this.cachedCitiesByCountries.set(key, cities);
  }
}
