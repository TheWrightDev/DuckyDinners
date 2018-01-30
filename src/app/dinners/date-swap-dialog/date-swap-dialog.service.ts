import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DateSwapDialogService {
    public $initiateSwap: Subject<Date> = new Subject<Date>();
    public $refresh: Subject<Date> = new Subject<Date>();

    constructor() { }

    public swap(date: Date) {
        this.$initiateSwap.next(date);
    }

    public refresh(date: Date) {
        this.$refresh.next(date);
    }
}
