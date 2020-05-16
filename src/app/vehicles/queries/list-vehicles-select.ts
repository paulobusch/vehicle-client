import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { VehicleSelectList } from './view-models/vehicle-select-list';

export class ListVehiclesSelect implements IQuery<VehicleSelectList[]> {
    includeAnnouncements: boolean;

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<VehicleSelectList[]>> {
        return http.get<IQueryResult<VehicleSelectList[]>>(`${apiUrl}/vehicles/select`);
    }
}