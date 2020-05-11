import { VehicleList } from './view-models/vehicle-list';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { toUrl } from 'src/app/shared/content/to-url';

export class ListVehicles implements IQuery<VehicleList[]> {
    constructor(
        public year?: number,
        public colorId?: string,
        public fuelId?: string,
        public modelId?: string,
        public brandId?: string
    ) { }

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<VehicleList[]>> {
        return http.get<IQueryResult<VehicleList[]>>(`${apiUrl}/vehicles?${toUrl(this)}`);
    }
}