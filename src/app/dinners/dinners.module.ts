import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DuckyNoteModule } from '../core/ducky-note/ducky-note.module';
import { DinnerService } from './dinner.service';
import { DinnersComponent } from './dinners.component';
import { MealInputComponent } from './meal-input/meal-input.component';
import { WeekDayComponent } from './week-day/week-day.component';
import { DateSwapDialogComponent } from './date-swap-dialog/date-swap-dialog.component';
import { DateSwapDialogService } from './date-swap-dialog/date-swap-dialog.service';
import { MealHistoryComponent } from './meal-history/meal-history.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DuckyNoteModule,
  ],
  declarations: [DinnersComponent, MealInputComponent, WeekDayComponent, DateSwapDialogComponent, MealHistoryComponent],
  exports: [DinnersComponent],
  providers: [DinnerService, DateSwapDialogService]
})
export class DinnersModule {
}
