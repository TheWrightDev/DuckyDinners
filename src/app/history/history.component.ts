import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { DuckyMealService } from '../core/ducky-note/ducky-meal.service';
import { DuckyMeal } from '../core/ducky-note/ducky-meal.model';
import { DateSwapDialogService } from '../dinners/date-swap-dialog/date-swap-dialog.service';


@Component({
  selector: 'dd-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public meals: DuckyMeal[];
  public copyToDaysMenuItems: MenuItem[] = [];

  constructor(private messageService: MessageService, private duckyMealService: DuckyMealService, private dateSwapDialogService: DateSwapDialogService) { }

  ngOnInit() {
    this.duckyMealService.search().subscribe(results => {
      this.meals = results;
    });

    this.refreshMenuItems();
  }

  private refreshMenuItems() {
    const momentDate = moment(new Date());

    const copyToDaysMenuItems = [];
    for (let i = 1; i <= 7; i++) {
      const day = momentDate.clone().isoWeekday(i);
      copyToDaysMenuItems.push({
        label: day.format('dddd'),
        command: () => this.copyToDate(day.toDate()),
      });
    }
    copyToDaysMenuItems.push({ label: 'Copy to Date', command: () => this.dateSwapDialogService.swap(new Date()) });
    this.copyToDaysMenuItems = copyToDaysMenuItems;
  }

  public copyToDate(date: Date) {
    console.log('Copy requested.')
  }

  public getSidesTooltip(meal: DuckyMeal) {
    if (!meal.sides.length)
      return null;
    return meal.sides.map(s => '- ' + s.side).join('<br>');
  }
}
