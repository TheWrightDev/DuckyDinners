import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMenuComponent, AppSubMenu } from './menu.component';
import { AppTopBar } from './topbar.component';
import { AppFooter } from './footer.component';
import { AppRightPanel } from './rightpanel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    AppMenuComponent,
    AppSubMenu,
    AppTopBar,
    AppFooter,
    AppRightPanel,
  ],
  exports: [
    AppMenuComponent,
    AppSubMenu,
    AppTopBar,
    AppFooter,
    AppRightPanel,
  ]
})
export class LayoutModule { }
