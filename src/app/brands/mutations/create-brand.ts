import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';

export class CreateBrand implements IMutation {
    public id: string;
    public name: string;

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.post<IMutationResult>(`${apiUrl}/brands`, this);
    }
}