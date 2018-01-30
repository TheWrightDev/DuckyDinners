import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MetaService } from './meta.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})
export class MetaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MetaModule,
      providers: [
        MetaService,
      ]
    };
  }
}

