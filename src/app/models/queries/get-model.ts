import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { ModelDetail } from './view-models/model-detail';
import { HttpClient } from '@angular/common/http';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';

export class GetModel implements IQuery<ModelDetail> {
    constructor(
        public id: string
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<ModelDetail>> {
        return http.get<IQueryResult<ModelDetail>>(`${apiUrl}/models/${this.id}`);
    }
}