import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQuery } from './interfaces/query';
import { Observable } from 'rxjs';
import { IQueryResult } from './results/query-result'
import { environment } from '../../../environments/environment';;
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QueriesHandlerService {
  constructor(private http: HttpClient) { }

  handle<T>(mutation: IQuery<T>): Observable<IQueryResult<T>> {
    return mutation.execute(this.http, environment.api_url).pipe(take(1));
  }
}