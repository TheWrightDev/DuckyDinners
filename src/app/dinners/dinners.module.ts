import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DinnersComponent } from './dinners.component';
import { SharedModule } from '../shared/shared.module';
import { MealInputComponent } from './meal-input/meal-input.component';
import { WeekDayComponent } from './week-day/week-day.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [DinnersComponent, MealInputComponent, WeekDayComponent],
  exports: [DinnersComponent]
})
export class DinnersModule {

}
