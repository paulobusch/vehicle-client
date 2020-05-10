import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { ModelList } from './view-models/model-list';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class ListModels implements IQuery<ModelList[]> {
    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<ModelList[]>> {
        return http.get<IQueryResult<ModelList[]>>(`${apiUrl}/models`);
    }
}