import { Component, OnInit, ViewChild, Input } from '@angular/core';

import * as moment from 'moment';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { DinnerService } from '../dinner.service';
import { DuckyMeal } from '../../core/ducky-note/ducky-meal.model';
import { DuckyMealService } from '../../core/ducky-note/ducky-meal.service';
import { DateSwapDialogService } from '../date-swap-dialog/date-swap-dialog.service';

@Component({
  selector: 'dd-meal-history',
  templateUrl: './meal-history.component.html',
  styleUrls: ['./meal-history.component.scss']
})
export class MealHistoryComponent implements OnInit {
  @Input() shouldLoad: boolean = false;
  public meals: DuckyMeal[];
  public copyToDaysMenuItems: MenuItem[] = [];
  public startingDate: Date;
  public mealRowClickedForMenu: DuckyMeal;

  constructor(
    private messageService: MessageService,
    private dinnerService: DinnerService,
    private duckyMealService: DuckyMealService,
    private dateSwapDialogService: DateSwapDialogService
  ) {
    this.dinnerService.$startingDate.subscribe(startingDate => this.refreshMenuItems(startingDate));
  }

  ngOnInit() {
    this.duckyMealService.search().subscribe(results => {
      this.meals = results;
    });
  }

  private refreshMenuItems(startingDate: Date) {
    const momentDate = moment(startingDate);

    const copyToDaysMenuItems = [];
    for (let i = 1; i <= 7; i++) {
      const day = momentDate.clone().isoWeekday(i);
      copyToDaysMenuItems.push({
        label: day.format('dddd - MMM Do'),
        command: () => this.copyToDate(day.toDate()),
      });
    }
    copyToDaysMenuItems.push({ label: 'Choose Date', command: () => this.openCopyToDialog() });
    this.copyToDaysMenuItems = copyToDaysMenuItems;
  }

  public openCopyToDialog() {
    if (this.mealRowClickedForMenu) {
      this.dateSwapDialogService.swap(new Date(this.mealRowClickedForMenu.date));
    }
  }

  public copyToDate(targetDate: Date) {
    if (this.mealRowClickedForMenu) {
      // Derpy clone.
      const newMeal = <DuckyMeal>JSON.parse(JSON.stringify(this.mealRowClickedForMenu));

      // Set the new date
      newMeal.date = targetDate;

      // Clear any old ids.
      for (let i = 0; i < newMeal.sides.length; i++) {
        newMeal.sides[i].id = null;
      }

      // Save the new copy.
      this.duckyMealService.saveMeal(newMeal).subscribe(() => {
        this.dateSwapDialogService.refresh(newMeal.date);
      });
    }
  }

  public getSidesTooltip(meal: DuckyMeal) {
    if (!meal.sides.length) {
      return null;
    }
    return meal.sides.map(s => '- ' + s.side).join('<br>');
  }
}
