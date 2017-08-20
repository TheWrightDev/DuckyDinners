import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DuckyNoteModule } from './core/ducky-note/ducky-note.module';
import { HomeComponent } from './home/home.component';
import { DinnersComponent } from './dinners/dinners.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DinnersComponent,
    NotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DuckyNoteModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
