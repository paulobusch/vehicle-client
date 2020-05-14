import { ReservationDetail } from './view-models/reservation-detail';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';

export class GetReservation implements IQuery<ReservationDetail> {
    constructor(
        public id: string
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<ReservationDetail>> {
        return http.get<IQueryResult<ReservationDetail>>(`${apiUrl}/reservations/${this.id}`);
    }
}