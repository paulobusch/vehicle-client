import { Brand } from './view-models/brand-list';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ListBrands implements IQuery<Brand[]> {
    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<Brand[]>> {
        return http.get<IQueryResult<Brand[]>>(`${apiUrl}/brands`);
    }
}