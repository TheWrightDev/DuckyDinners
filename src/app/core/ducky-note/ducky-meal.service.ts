import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { DuckyMeal } from './ducky-meal.model';

@Injectable()
export class DuckyMealService {
  private readonly baseUrl = environment.baseApiUrl + 'DuckyMeals';

  constructor(private http: HttpClient) { }

  public search(startDate?: Date, endDate?: Date): Observable<DuckyMeal[]> {
    const params = new HttpParams({
      fromObject: {
        'startDate': (startDate ? startDate.toDateString() : null),
        'endDate': (startDate ? startDate.toDateString() : null)
      }
    });
    return this.http.get<DuckyMeal[]>(this.baseUrl, { params });
  }

  public getMeal(id: Date): Observable<DuckyMeal> {
    return this.http.get<DuckyMeal>(this.baseUrl + '/' + encodeURI(id.toDateString()));
  }

  public saveMeal(duckyMeal: DuckyMeal): Observable<DuckyMeal> {
    const test = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<DuckyMeal>(
      this.baseUrl + '/' + encodeURI(duckyMeal.date.toDateString()),
      JSON.stringify(duckyMeal),
      { headers: test }
    );
  }

  public swapMeal(fromDate: Date, toDate: Date) {
    return this.http.post(`${this.baseUrl}/${encodeURI(fromDate.toDateString())}/swap/${encodeURI(toDate.toDateString())}`, null);
  }
}
