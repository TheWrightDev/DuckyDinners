import { Component, EventEmitter, Input, Output, OnDestroy, OnInit, QueryList, ElementRef, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import * as moment from 'moment';
import { Subscription } from 'rxjs/Subscription';

import { FoodInputComponent } from '../../shared/components/food-input/food-input.component';
import { DuckyMeal } from '../../core/ducky-note/ducky-meal.model';
import { DuckyMealService } from '../../core/ducky-note/ducky-meal.service';
import { DateSwapDialogService } from '../date-swap-dialog/date-swap-dialog.service';

@Component({
  selector: 'dd-meal-input',
  templateUrl: './meal-input.component.html',
  styleUrls: ['./meal-input.component.scss']
})
export class MealInputComponent implements OnInit, OnDestroy {
  public isLoaded: boolean = false;

  @Input()
  public date: Date;

  @Input() // Don't set this, use SetSaved() so the event will also be fired.
  public isSaved: boolean = true;

  @Output()
  public isSavedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  public isEmpty: boolean = true;

  @Output()
  public isEmptyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public mealForm: FormGroup;
  public get sidesFormArray() { return <FormArray>this.mealForm.get('sides'); }

  private formChangeSubscription: Subscription;
  private saveMealSubscription: Subscription;
  private refreshSubscription: Subscription;

  @ViewChildren('side') sideFoodInputComponents: QueryList<FoodInputComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private duckyMealService: DuckyMealService,
    private dateSwapDialogService: DateSwapDialogService
  ) { }

  ngOnInit() {
    this.mealForm = this.getMealFormGroup();
    this.loadMeal();

    // Watch for refresh requests.
    this.refreshSubscription = this.dateSwapDialogService.$refresh.subscribe(date => {
      if (moment(date).isSame(this.date)) {
        this.loadMeal();
      }
    });
  }

  ngOnDestroy() {
    if (this.formChangeSubscription) {
      this.formChangeSubscription.unsubscribe();
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public removeSide(index: number) {
    this.sidesFormArray.removeAt(index);
  }

  public addSide() {
    this.sidesFormArray.push(this.getSideFormGroup());
    setTimeout(() => {
      this.sideFoodInputComponents.last.focus();
    });
  }

  public trackSides(index: number, side: any) {
    return index;
  }

  public goToFirstSide() {
    if (this.sideFoodInputComponents.length) {
      this.sideFoodInputComponents.first.focus();
    } else {
      this.addSide();
    }
  }

  public isLink(text: string) {
    return text && (text.startsWith('http://') || text.startsWith('https://'));
  }

  private loadMeal() {
    this.isLoaded = false;


    // Unsub previous form change subscription.
    if (this.formChangeSubscription) {
      this.formChangeSubscription.unsubscribe();
    }

    // Remove any existing sides from the form.
    const sides = this.sidesFormArray;
    while (sides.length !== 0) {
      sides.removeAt(0);
    }

    this.duckyMealService.getMeal(this.date).finally(() => {
      const originalJSON = JSON.stringify(this.getMealWithoutEmptySides(this.mealForm.value));
      let isFirstCheck = true;
      this.formChangeSubscription = this.mealForm.valueChanges
        .map(value => {
          if (value.sides) {
            value.sides = value.sides.filter(s => s.side);
          }
          return value;
        })
        .distinctUntilChanged((a, b) => a === b, v => JSON.stringify(v))
        .filter(value => {
          if (isFirstCheck) {
            isFirstCheck = false;
            return JSON.stringify(value) !== originalJSON;
          }
          return true;
        })
        .do((value: DuckyMeal) => {
          this.setSaved(false);
          this.updateIsEmpty(value);
        })
        .debounceTime(500)
        .subscribe(value => {
          value.date = this.date;
          if (this.saveMealSubscription) {
            this.saveMealSubscription.unsubscribe();
          }
          this.saveMealSubscription = this.duckyMealService.saveMeal(value).subscribe(result => {
            this.setSaved(true);
          });
        });
    }).subscribe(meal => {
      if (meal.sides && meal.sides.length > 0) {
        meal.sides.forEach(m => this.sidesFormArray.push(this.getSideFormGroup()));
      }
      this.mealForm.patchValue(meal);
      this.updateIsEmpty(meal);
      this.isLoaded = true;
    }, error => { // Not found;
      this.isLoaded = true;
    });
  }

  private setSaved(isSaved: boolean) {
    this.isSaved = isSaved;
    this.isSavedChange.emit(isSaved);
  }

  private getMealWithoutEmptySides(duckyMeal: DuckyMeal): DuckyMeal {
    if (duckyMeal && duckyMeal.sides) {
      duckyMeal.sides = duckyMeal.sides.filter(s => s.side);
    }
    return duckyMeal;
  }

  private updateIsEmpty(duckyMeal: DuckyMeal): void {
    if (this.isEmpty) {
      if (duckyMeal && (duckyMeal.dinner || duckyMeal.sides.length)) {
        this.isEmpty = false;
        this.isEmptyChange.emit(false);
      }
    } else {
      if (!duckyMeal || !(duckyMeal.dinner || duckyMeal.sides.length)) {
        this.isEmpty = true;
        this.isEmptyChange.emit(true);
      }
    }

  }

  private getMealFormGroup() {
    return this.formBuilder.group({
      dinner: [''],
      sides: this.formBuilder.array([]),
    });
  }

  private getSideFormGroup() {
    return this.formBuilder.group({
      id: 0,
      date: '',
      side: '',
    });
  }
}
