import { BrandDetail } from './view-models/brand-detail';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class GetBrand implements IQuery<BrandDetail> {
    constructor(
        public id: string
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<BrandDetail>> {
        return http.get<IQueryResult<BrandDetail>>(`${apiUrl}/brands/${this.id}`);
    }
}