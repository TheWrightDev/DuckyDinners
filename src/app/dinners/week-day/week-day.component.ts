import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';

import * as moment from 'moment';
import { MenuItem } from 'primeng/primeng';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'dd-week-day',
  templateUrl: './week-day.component.html',
  styleUrls: ['./week-day.component.scss'],
})
export class WeekDayComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Output() swap: EventEmitter<Date> = new EventEmitter<Date>();

  public dayOfWeek: string;
  public isMealSaved: boolean = true;
  public isEmpty: boolean = true;

  public swappableDays: MenuItem[] = [];

  constructor() { }

  ngOnInit() {
    this.evaluateDate();
  }

  ngOnChanges() {
    this.evaluateDate();
  }

  private evaluateDate() {
    if (this.date) {
      const momentDate = moment(this.date);
      const nthDayOfWeek = moment(this.date).isoWeekday();
      this.dayOfWeek = momentDate.format('dddd');

      const swappableDays = [];
      for (let i = 1; i <= 7; i++) {
        const swappableDay = momentDate.clone().isoWeekday(i);
        swappableDays.push({
          label: swappableDay.format('dddd'),
          disabled: i === nthDayOfWeek,
          command: () => this.swap.next(swappableDay.toDate()),
        });
      }
      swappableDays.push({ label: 'Choose a Date', disabled: true, command: () => console.log('not implemented') });
      this.swappableDays = swappableDays;
    }
  }
}
