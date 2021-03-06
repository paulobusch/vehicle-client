import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class UpdateBrand implements IMutation {
    public id: string;
    public name: string;

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.put<IMutationResult>(`${apiUrl}/brands/${this.id}`, this);
    }
}