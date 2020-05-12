import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class DeleteModel implements IMutation {
    constructor(
        public id: string
    ) {}

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.delete<IMutationResult>(`${apiUrl}/models/${this.id}`);
    }
}