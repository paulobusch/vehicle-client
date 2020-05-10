import { ColorList } from './view-models/color-list';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { HttpClient } from '@angular/common/http';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';

export class ListColors implements IQuery<ColorList[]> {
    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<ColorList[]>> {
        return http.get<IQueryResult<ColorList[]>>(`${apiUrl}/vehicles/colors`);
    }
}