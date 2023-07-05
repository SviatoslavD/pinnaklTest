// System
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// App
import { CountryHttpResponseInterface } from '../../models/countryHttpResponse.interface';
import { CitiesHttpResponseInterface } from '../../models/citiesHttpResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesDataService {

  private apiUrl: string = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient) {}

  /**
   * Get all countries and capitals
   * @return Observable{CountryHttpResponseInterface}
   */
  getCountriesAndCapitals(): Observable<CountryHttpResponseInterface> {
    return this.http.get<CountryHttpResponseInterface>(`${this.apiUrl}/capital`).pipe(catchError(this.handleError));
  }

  /**
   * Get all cities for provided country
   * @param {string} country
   * @return Observable{CitiesHttpResponseInterface}
   */
  getCountryCities(country: string): Observable<CitiesHttpResponseInterface> {
    // NOTE: Some countries return 500 Error, some issue with API,
    // but this is not impact on main idea of the implementation
    return this.http.post<CitiesHttpResponseInterface>(`${this.apiUrl}/cities`, {country}).pipe(catchError(this.handleError));
  }

  /**
   * @param {HttpErrorResponse} error
   */
  private handleError(error: HttpErrorResponse) {
    if (!error.status) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Returned error code ${error.status}. Body: `, error.error);
    }
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
