import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class UpdateAnnouncement implements IMutation {
    public id: string;
    public pricePhurchase: number;
    public priceSale: number;
    public vehicleId: string;

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.put<IMutationResult>(`${apiUrl}/announcements/${this.id}`, this);
    }
}