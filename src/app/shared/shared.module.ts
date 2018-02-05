import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

import { SpinnerComponent } from './spinner/spinner.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FoodInputComponent } from './components/food-input/food-input.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        InputTextModule,
        TooltipModule,
    ],
    declarations: [SpinnerComponent, SafeUrlPipe, FoodInputComponent],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        CalendarModule,
        ContextMenuModule,
        DialogModule,
        InputTextModule,
        MenuModule,
        PanelModule,
        SidebarModule,
        SelectButtonModule,
        TableModule,
        TooltipModule,
        SpinnerComponent,
        SafeUrlPipe,
        FoodInputComponent,
    ]
})
export class SharedModule { }
