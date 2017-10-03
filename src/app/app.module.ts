import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './core/layout/layout.module';

import { DuckyNoteModule } from './core/ducky-note/ducky-note.module';
import { DinnersModule } from './dinners/dinners.module';

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
    NotesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    DuckyNoteModule.forRoot(),
    DinnersModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

