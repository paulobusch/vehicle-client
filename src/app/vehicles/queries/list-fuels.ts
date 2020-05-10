import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { FuelList } from './view-models/fuel-list';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class ListFuels implements IQuery<FuelList[]> {
    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<FuelList[]>> {
        return http.get<IQueryResult<FuelList[]>>(`${apiUrl}/vehicles/fuels`);
    }
}