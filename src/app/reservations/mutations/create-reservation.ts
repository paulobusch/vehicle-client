import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';

export class CreateReservation implements IMutation {
    public id: string;
    public contactName: string;
    public contactPhone: string;
    public announcementId: string;

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.post<IMutationResult>(`${apiUrl}/reservations`, this);
    }
}