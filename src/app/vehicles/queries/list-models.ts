import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { Model } from './view-models/model-list';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class ListModels implements IQuery<Model[]> {
    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<Model[]>> {
        return http.get<IQueryResult<Model[]>>(`${apiUrl}/models`);
    }
}