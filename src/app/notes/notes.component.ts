import { Component, OnInit } from '@angular/core';

import { DuckyNoteService } from '../core/ducky-note/ducky-note.service';

@Component({
  selector: 'dd-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private duckyNoteService: DuckyNoteService) { }

  ngOnInit() {
  }

}
