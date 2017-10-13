import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

import { Meta } from './meta.model';

@Injectable()
export class MetaService {
    private readonly baseUrl = environment.baseApiUrl + 'Meta';

    constructor(private http: HttpClient) { }

    public getMeta(url: string): Observable<Meta> {
        return <Observable<Meta>>this.http.get(this.baseUrl + '?url=' + url);
    }
}
