import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'dd-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  constructor() { }
}
