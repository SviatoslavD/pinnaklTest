import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySelectorComponent {

}
