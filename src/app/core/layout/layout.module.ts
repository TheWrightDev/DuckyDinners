import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMenuComponent, AppSubMenuComponent } from './menu.component';
import { AppTopBar } from './topbar.component';
import { AppFooter } from './footer.component';
import { AppRightpanelComponent } from './rightpanel.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBar,
    AppFooter,
    AppRightpanelComponent,
  ],
  exports: [
    AppMenuComponent,
    AppSubMenuComponent,
    AppTopBar,
    AppFooter,
    AppRightpanelComponent,
  ]
})
export class LayoutModule { }
