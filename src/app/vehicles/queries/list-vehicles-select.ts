import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { VehicleSelectList } from './view-models/vehicle-select-list';
import { toUrl } from 'src/app/shared/content/to-url';

export class ListVehiclesSelect implements IQuery<VehicleSelectList[]> {
    public includeAnnouncements: boolean;
    public modelId: string;

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<VehicleSelectList[]>> {
        return http.get<IQueryResult<VehicleSelectList[]>>(`${apiUrl}/vehicles/select?${toUrl(this)}`);
    }
}