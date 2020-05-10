import { HttpClient } from '@angular/common/http';
import { IMutationResult } from '../results/mutation-result';
import { Observable } from 'rxjs';

export interface IMutation {
    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult>;
}