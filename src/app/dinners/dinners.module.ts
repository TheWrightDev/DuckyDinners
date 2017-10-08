import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DuckyNoteModule } from '../core/ducky-note/ducky-note.module';
import { DinnersComponent } from './dinners.component';
import { MealInputComponent } from './meal-input/meal-input.component';
import { WeekDayComponent } from './week-day/week-day.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DuckyNoteModule,
  ],
  declarations: [DinnersComponent, MealInputComponent, WeekDayComponent],
  exports: [DinnersComponent]
})
export class DinnersModule {

}
