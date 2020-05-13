import { ReservationList } from './view-models/reservation-list';
import { IQuery } from 'src/app/shared/handlers/interfaces/query';
import { IQueryResult } from 'src/app/shared/handlers/results/query-result';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ListReservations implements IQuery<ReservationList[]> {
    execute(http: HttpClient, apiUrl: string): Observable<IQueryResult<ReservationList[]>> {
        return http.get<IQueryResult<ReservationList[]>>(`${apiUrl}/reservations`);
    }
}