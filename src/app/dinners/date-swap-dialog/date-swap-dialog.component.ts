import { Component, OnInit } from '@angular/core';

import { DuckyMealService } from '../../core/ducky-note/ducky-meal.service';
import { DateSwapDialogService } from './date-swap-dialog.service';
import { DuckyMeal } from '../../core/ducky-note/ducky-meal.model';
import { SelectItem } from 'primeng/primeng';


@Component({
  selector: 'dd-date-swap-dialog',
  templateUrl: './date-swap-dialog.component.html',
  styleUrls: ['./date-swap-dialog.component.scss']
})
export class DateSwapDialogComponent implements OnInit {
  public visible: boolean;
  public isLoadingMeal: boolean;
  public meal: DuckyMeal;
  public targetDate: Date;
  public targetMeal: DuckyMeal;

  constructor(private dateSwapDialogService: DateSwapDialogService, private duckyMealService: DuckyMealService) {
    dateSwapDialogService.$initiateSwap.subscribe(date => {
      this.visible = true;
      this.isLoadingMeal = true;
      this.duckyMealService.getMeal(date).subscribe(meal => {
        this.meal = meal;
        this.isLoadingMeal = false;
      });
    });
  }

  ngOnInit() {
  }

  public cancel() {
    this.visible = false;
  }

  public copy() {
    // Derpy clone.
    const newMeal = <DuckyMeal>JSON.parse(JSON.stringify(this.meal));

    // Set the new date
    newMeal.date = this.targetDate;

    // Clear any old ids.
    for (let i = 0; i < newMeal.sides.length; i++) {
      newMeal.sides[i].id = null;
    }

    // Save the new copy.
    this.duckyMealService.saveMeal(newMeal).subscribe(() => {
      this.dateSwapDialogService.refresh(newMeal.date);
      this.visible = false;
    });
  }

  public onSwapDateChange() {
    this.duckyMealService.getMeal(this.targetDate).subscribe(targetMeal => {
      if (!targetMeal.dinner) {
        targetMeal.dinner = '- Empty -';
      }
      this.targetMeal = targetMeal;
    }, noMeal => {
      this.targetMeal = { date: this.targetDate, dinner: '- Empty -', sides: [] };
    });
  }

  public onDialogHide() {
    this.isLoadingMeal = true;
    this.meal = null;
    this.targetDate = null;
    this.targetMeal = null;
  }
}
