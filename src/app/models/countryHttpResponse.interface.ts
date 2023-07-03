// App
import { CountryInterface } from './country.interface';

export interface CountryHttpResponseInterface {
  error: string;
  msg: string;
  data: Array<CountryInterface>;
}
