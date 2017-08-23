import { Component, Input, OnChanges, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'dd-week-day',
  templateUrl: './week-day.component.html',
  styleUrls: ['./week-day.component.scss'],
})
export class WeekDayComponent implements OnInit, OnChanges {
  @Input() date: Date;

  public dayOfWeek: string;

  constructor() { }

  ngOnInit() {
    this.evaluateDate();
  }

  ngOnChanges() {
    this.evaluateDate();
  }

  private evaluateDate() {
    if (this.date) {
      this.dayOfWeek = moment(this.date).format('dddd');
    }
  }
}
