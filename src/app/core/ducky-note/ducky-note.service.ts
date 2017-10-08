import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { DuckyNote, DuckyNoteType } from './ducky-note.model';


@Injectable()
export class DuckyNoteService {
  private readonly baseUrl = environment.baseApiUrl + 'DuckyNotes';

  constructor(private http: HttpClient) { }

  public getNotes(duckyNoteType: DuckyNoteType, isActive: boolean = true) {
    return <Observable<DuckyNote[]>>this.http.get(this.baseUrl + `?duckyTypeId=${duckyNoteType}&isActive=${isActive}`);
  }

  public addNote(duckyNoteType: DuckyNoteType, note: string) {
    const newNote: DuckyNote = {
      duckyType: duckyNoteType,
      note: note,
      active: true,
    };
    return <Observable<DuckyNote>>this.http.post(this.baseUrl, newNote);
  }

  public markComplete(duckyNote: DuckyNote) {
    duckyNote.active = false;
    return <Observable<DuckyNote>>this.http.put(this.baseUrl, duckyNote);
  }
}
