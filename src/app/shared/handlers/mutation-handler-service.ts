import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IMutation } from './interfaces/mutation';
import { IMutationResult } from './results/mutation-result';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MutationsHandlerService {
  constructor(private http: HttpClient) { }

  handle(mutation: IMutation): Observable<IMutationResult> {
    return mutation.execute(this.http, environment.api_url).pipe(take(1));
  }
}
