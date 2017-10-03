import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { DuckyMeal } from './ducky-meal.model';

@Injectable()
export class DuckyMealService {
  private readonly baseUrl = 'http://thewrightdev.com/duckyapiv3/DuckyMeals/';
  // private readonly baseUrl = ''
  constructor(private http: HttpClient) { }

  public getMeal(id: Date): Observable<DuckyMeal> {
    return <Observable<DuckyMeal>>this.http.get(this.baseUrl + encodeURI(id.toDateString()));
  }

  public saveMeal(duckyMeal: DuckyMeal) {
    const test = new HttpHeaders({ 'Content-Type': 'application/json' });
    return <Observable<DuckyMeal>>this.http.put(
      this.baseUrl + encodeURI(duckyMeal.date.toDateString()),
      JSON.stringify(duckyMeal),
      { headers: test }
    );
  }
}
