// System
import { createAction, props } from '@ngrx/store';

export namespace CitiesActions {
  export const loadCitiesByCountry = createAction('[Cities] Load Countries By Country', props<{countryName: string}>());
  export const citiesByCountryLoaded = createAction('[Cities] Countries By Country Loaded', props<{countryName: string, cities: Array<string>}>());
  export const setSelectedCities = createAction('[Cities] Set Selected Cities', props<{selectedCities: Array<string>}>());
  export const errorOnCitiesLoading = createAction('[Cities] Error on cities loading');
}
