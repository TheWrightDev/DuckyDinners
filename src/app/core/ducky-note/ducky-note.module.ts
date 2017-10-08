import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DuckyNoteService } from './ducky-note.service';
import { DuckyMealService } from './ducky-meal.service';

import { NotesComponent } from './notes/notes.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [NotesComponent],
  exports: [NotesComponent]
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
