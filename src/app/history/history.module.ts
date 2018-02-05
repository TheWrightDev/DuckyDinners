import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { HistoryComponent } from './history.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [HistoryComponent],
  exports: [],
  providers: []
})
export class HistoryModule { }
