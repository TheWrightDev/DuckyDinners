import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';

import { DuckyNoteService } from '../ducky-note.service';
import { DuckyNoteType, DuckyNote } from '../ducky-note.model';

@Component({
  selector: 'dd-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  public categories = [
    { label: DuckyNoteType[DuckyNoteType.Groceries], value: DuckyNoteType.Groceries },
    { label: DuckyNoteType[DuckyNoteType.Tasks], value: DuckyNoteType.Tasks },
    { label: DuckyNoteType[DuckyNoteType.Other], value: DuckyNoteType.Other },
    { label: DuckyNoteType[DuckyNoteType.Costco], value: DuckyNoteType.Costco },
  ];
  public selectedCategory: number = DuckyNoteType.Groceries;
  public notes: DuckyNote[] = [];
  public newNoteText: string;

  @ViewChild('noteInput') private noteInput: ElementRef;

  constructor(private duckyNoteService: DuckyNoteService, private messageService: MessageService) { }

  ngOnInit() {
    this.refreshNotes();

  }

  public focusInput() {
    if (this.noteInput) {
      this.noteInput.nativeElement.focus();
    } else {
      setTimeout(() => {
        if (this.noteInput) {
          this.noteInput.nativeElement.focus();
        }
      });
    }
  }

  public onCategoryChanged() {
    this.refreshNotes();
  }

  public addNote() {
    if (this.newNoteText) {
      this.duckyNoteService.addNote(this.selectedCategory, this.newNoteText).subscribe(note => {
        this.notes.unshift(note);
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Oops', detail: `An error occurred, we didn't do what you wanted us to.` });
      });
      this.newNoteText = '';
    }
  }

  public markComplete(note) {
    this.duckyNoteService.markComplete(note).subscribe(() => {
      const completedNoteIndex = this.notes.indexOf(note);
      this.notes.splice(completedNoteIndex, 1);
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Oops', detail: `An error occurred, we didn't do what you wanted us to.` });
    });
  }

  public refreshNotes() {
    this.duckyNoteService.getNotes(this.selectedCategory).subscribe(notes => {
      this.notes = notes;
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Oops', detail: `An error occurred, we didn't do what you wanted us to.` });
    });
  }
}
