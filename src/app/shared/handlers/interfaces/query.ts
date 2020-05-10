import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQueryResult } from '../results/query-result';

export interface IQuery<T> {
    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<T>>;
}