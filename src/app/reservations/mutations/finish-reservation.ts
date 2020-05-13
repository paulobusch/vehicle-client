import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class FinishReservation implements IMutation {
    constructor(
        public id: string,
        public dateSale: Date
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.patch<IMutationResult>(`${apiUrl}/reservations/${this.id}/finish`, this);
    }
}