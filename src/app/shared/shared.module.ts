import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { SidebarModule } from 'primeng/primeng';
import { SelectButtonModule } from 'primeng/primeng';

import { SpinnerComponent } from './spinner/spinner.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        PanelModule,
        SidebarModule,
        SelectButtonModule,
    ],
    declarations: [SpinnerComponent, SafeUrlPipe],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        PanelModule,
        SidebarModule,
        SelectButtonModule,
        SpinnerComponent,
        SafeUrlPipe,
    ]
})
export class SharedModule { }
