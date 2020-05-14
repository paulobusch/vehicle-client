import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class UpdateReservation implements IMutation {
    public id: string;
    public contactName: string;
    public contactPhone: string;
    public announcementId: string;

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.put<IMutationResult>(`${apiUrl}/reservations/${this.id}`, this);
    }
}