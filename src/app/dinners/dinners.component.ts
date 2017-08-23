import { Component, OnInit } from '@angular/core';


import * as moment from 'moment';

@Component({
  selector: 'dd-dinners',
  templateUrl: './dinners.component.html',
  styleUrls: ['./dinners.component.scss']
})
export class DinnersComponent implements OnInit {
  public weekPickerDate: Date = moment().toDate();

  public startingDate: moment.Moment;
  public week: Date[] = [];

  constructor() { }

  ngOnInit() {
    this.onWeekPickerDateChange();
  }

  public onWeekPickerDateChange() {
    if (this.weekPickerDate) {
      this.startingDate = moment(this.weekPickerDate).startOf('isoWeek');
      for (let index = 0; index <= 6; index++) {
        this.week[index] = this.startingDate.day(index + 1).toDate();
      }
    }
  }

}
