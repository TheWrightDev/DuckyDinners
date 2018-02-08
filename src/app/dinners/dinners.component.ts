import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { MessageService } from 'primeng/components/common/messageservice';

import { DuckyMealService } from '../core/ducky-note/ducky-meal.service';
import { NotesComponent } from '../core/ducky-note/notes/notes.component';
import { DinnerService } from './dinner.service';

@Component({
  selector: 'dd-dinners',
  templateUrl: './dinners.component.html',
  styleUrls: ['./dinners.component.scss']
})
export class DinnersComponent implements OnInit {
  public weekPickerDate: Date = moment().toDate();

  public startingDate: moment.Moment;
  public mondayDisplayString: string;
  public sundayDisplayString: string;
  public week: Date[] = [];

  public isNotesPanelVisible: boolean = false;
  public isHistoryPanelVisible: boolean = false;

  @ViewChild(NotesComponent) private notesComponent: NotesComponent;

  constructor(private messageService: MessageService, private dinnerService: DinnerService, private duckyMealService: DuckyMealService) { }

  ngOnInit() {
    this.onWeekPickerDateChange();
  }

  public showNotes() {
    this.isNotesPanelVisible = true;
    this.notesComponent.focusInput();
  }

  public showHistory() {
    this.isHistoryPanelVisible = true;
  }

  public onWeekPickerDateChange() {
    if (this.weekPickerDate) {
      this.startingDate = moment(this.weekPickerDate).startOf('isoWeek');
      this.dinnerService.setStartingDate(this.startingDate.toDate());
      this.mondayDisplayString = this.startingDate.clone().format('MMMM Do');
      this.sundayDisplayString = this.startingDate.clone().add(6, 'days').format('MMMM Do');
      for (let index = 0; index <= 6; index++) {
        this.week[index] = this.startingDate.day(index + 1).toDate();
      }
    }
  }

  public previousWeek() {
    this.weekPickerDate = moment(this.weekPickerDate).subtract(1, 'weeks').toDate();
    this.onWeekPickerDateChange();
  }

  public nextWeek() {
    this.weekPickerDate = moment(this.weekPickerDate).add(1, 'weeks').toDate();
    this.onWeekPickerDateChange();
  }

  public swapDay(swapFromDate: Date, swapToDate: Date) {
    this.duckyMealService.swapMeal(swapFromDate, swapToDate).subscribe(swap => {
      this.onWeekPickerDateChange();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Swapped meals for ${moment(swapFromDate).format('dddd')} and ${moment(swapToDate).format('dddd')}`
      });
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Oops', detail: `An error occurred, we didn't do what you wanted us to.` });
    });
  }
}
