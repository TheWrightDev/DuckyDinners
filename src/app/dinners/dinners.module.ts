import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DinnersComponent } from './dinners.component';
import { SharedModule } from '../shared/shared.module';
import { DinnerInputComponent } from './dinner-input/dinner-input.component';
import { WeekDayComponent } from './week-day/week-day.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [DinnersComponent, DinnerInputComponent, WeekDayComponent],
  exports: [DinnersComponent]
})
export class DinnersModule {

}
