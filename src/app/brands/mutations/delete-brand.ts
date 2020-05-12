import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';

export class DeleteBrand implements IMutation {
    constructor(
        public id: string
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.delete<IMutationResult>(`${apiUrl}/brands/${this.id}`);
    }
}