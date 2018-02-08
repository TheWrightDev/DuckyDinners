import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DinnerService {
    public $startingDate: Subject<Date> = new Subject<Date>();

    constructor() { }

    public setStartingDate(date: Date) {
        this.$startingDate.next(date);
    }
}
