import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './core/layout/layout.module';

import { DuckyNoteModule } from './core/ducky-note/ducky-note.module';
import { DinnersModule } from './dinners/dinners.module';
import { HistoryModule } from './history/history.module';
import { MetaModule } from './core/meta/meta.module';

import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    GrowlModule,
    LayoutModule,
    DuckyNoteModule.forRoot(),
    MetaModule.forRoot(),
    DinnersModule,
    HistoryModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

