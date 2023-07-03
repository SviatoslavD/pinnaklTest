// System
import { ChangeDetectionStrategy, Component , OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, debounceTime, BehaviorSubject } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// App
import { CountriesDataService } from '../../services/api/countries-data.service';
import { CountryInterface } from '../../models/country.interface';
import { CountryHttpResponseInterface } from '../../models/countryHttpResponse.interface';
import { CitiesHttpResponseInterface } from '../../models/citiesHttpResponse.interface';
import { CountryStateService } from '../../services/country-state.service';
import { CountrySelectService } from '../../services/country-select.service';

@Component({
  selector: 'app-countries-selector',
  templateUrl: './countries-selector.component.html',
  styleUrls: ['./countries-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [CountriesDataService, CountryStateService, CountrySelectService]
})
export class CountriesSelectorComponent implements OnInit, OnDestroy {

  countriesSubjectAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedCountriesSubjectAmount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  countries: Array<CountryInterface> = [];
  cities: Array<string> = [];

  countriesControl = new FormControl<Array<CountryInterface>>([]);
  citiesControl = new FormControl<Array<string>>({ value: [], disabled: true });

  selectedCountries: Array<CountryInterface> = [];
  selectedCities: Array<string> = [];

  loading: boolean = true;
  citiesLoading: boolean = false;

  private terminator: Subject<void> = new Subject();

  constructor( private readonly countriesDataService: CountriesDataService,
               private readonly countryStateService: CountryStateService,
               readonly countrySelectService: CountrySelectService) {
  }

  ngOnInit(): void {
    this.subscribeOnSelectionsChange();
  }

  ngOnDestroy(): void {
    this.terminator.next();
    this.terminator.complete();
  }

  /**
   * @param{boolean} isOpened
   */
  countrySelectOpened(isOpened: boolean): void {
    if (isOpened && !this.countries.length) this.getCountries();
  }

  private getCountries(): void {
    if (this.countries.length) {
      return;
    }

    this.countries = this.countryStateService.getCountries;
    if (this.countries.length) {
      return;
    }

    this.countriesDataService.getCountriesAndCapitals()
      .pipe(takeUntil(this.terminator))
      .subscribe((response: CountryHttpResponseInterface) => {
        this.countries = response.data;
        this.countryStateService.setCountries = response.data;
        this.loading = false;
        this.countriesSubjectAmount.next(this.countries.length);
      }, () => this.loading = false);
  }

  private getCitiesForSelectedCountries(): void {
    if (!this.selectedCountries.length) return;

    const {cities, countryToLoadCities} = this.countrySelectService.getCitiesForCountries(this.selectedCountries, this.cities);
    this.cities = cities;

    if (countryToLoadCities) {
      // Get cities from API
      // NOTE: this function invoked on each country select
      // max one country name will be used to load the city at the invocation
      this.getCitiesByCountry(countryToLoadCities);
    } else {
      this.countrySelectService.getAllLoadedCitiesAmount();
      this.selectedCities = this.countrySelectService.setSelectedCities(this.selectedCountries, this.selectedCities);
      this.citiesControl.setValue(this.selectedCities);
      this.citiesLoading = false;
    }
  }

  /**
   * @param {string} country
   */
  private getCitiesByCountry(country: string): void {
    // NOTE: Some countries return 500 Error, some issue with API,
    // but this is not impact on main idea of the implementation, the errors covered
    if (this.countries.find((obj: CountryInterface) => obj.name === country)?.disabled) {
      return;
    }
    this.countriesDataService.getCountryCities(country)
      .pipe(takeUntil(this.terminator), debounceTime(100))
      .subscribe((response: CitiesHttpResponseInterface) => {
        this.countryStateService.storeLoadedCityByCountry(country, response.data);
        this.cities = [...this.cities, ...response.data];
        this.countrySelectService.getAllLoadedCitiesAmount();
        this.selectedCities = this.countrySelectService.setSelectedCities(this.selectedCountries, this.selectedCities);
        this.citiesControl.setValue(this.selectedCities);
        this.citiesLoading = false;
      }, () => this.handleErrorCountryResponse(country));
  }

  private subscribeOnSelectionsChange(): void {
    this.countriesControl.valueChanges
      .pipe(takeUntil(this.terminator), debounceTime(200))
      .subscribe((values: Array<CountryInterface> | null) => {
        this.selectedCountries = values ? values.filter(val => !val.disabled) : [];
        this.selectedCountriesSubjectAmount.next(this.selectedCountries.length);
        if (this.selectedCountries.length) {
          this.citiesLoading = true;
          this.getCitiesForSelectedCountries();
        } else {
          this.cities = [];
          this.citiesControl.reset();
        }
      });

    this.citiesControl.valueChanges
      .pipe(takeUntil(this.terminator))
      .subscribe((values: Array<string> | null) => {
        this.selectedCities = values ? [...values] : [];
      });
  }

  /**
   * @param{string} country
   */
  private handleErrorCountryResponse(country: string): void {
    this.citiesLoading = false;
    const brokenCountryIndex = this.selectedCountries.findIndex((obj: CountryInterface) => obj.name === country);
    this.selectedCountries.splice(brokenCountryIndex, 1);
    this.countriesControl.setValue(this.selectedCountries);
    const brokenCountry = this.countries.find((obj: CountryInterface) => obj.name === country);
    if (brokenCountry) {
      brokenCountry.disabled = true;
      brokenCountry.name = `${brokenCountry.name} (not available)`;
    }
  }
}
