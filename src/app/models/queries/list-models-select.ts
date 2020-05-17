import { ModelSelectList } from './view-models/model-select-list';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { toUrl } from 'src/app/shared/content/to-url';

export class ListModelsSelect implements IQuery<ModelSelectList[]> {
    public brandId: string;

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<ModelSelectList[]>> {
        return http.get<IQueryResult<ModelSelectList[]>>(`${apiUrl}/models/select?${toUrl(this)}`);
    }
}
