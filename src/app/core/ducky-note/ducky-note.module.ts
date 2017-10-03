import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuckyNoteService } from './ducky-note.service';
import { DuckyMealService } from './ducky-meal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class DuckyNoteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DuckyNoteModule,
      providers: [
        DuckyNoteService,
        DuckyMealService,
      ]
    };
  }
}
