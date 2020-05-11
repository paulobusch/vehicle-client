import { VehicleDetail } from './view-models/vehicle-detail';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { HttpClient } from '@angular/common/http';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';

export class GetVehicle implements IQuery<VehicleDetail> {
    constructor(
        public id: string
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<VehicleDetail>> {
        return http.get<IQueryResult<VehicleDetail>>(`${apiUrl}/vehicles/${this.id}`);
    }
}