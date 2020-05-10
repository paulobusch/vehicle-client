import { IMutation } from 'src/app/shared/handlers/interfaces/mutation';
import { Observable } from 'rxjs';
import { IMutationResult } from 'src/app/shared/handlers/results/mutation-result';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoginResult } from './view-models/login-result';
import { User } from './view-models/user-result';

export class LoginUser implements IMutation {
    constructor(
        public login: string,
        public password: string
    ) { }

    execute(http: HttpClient, apiUrl: string): Observable<IMutationResult> {
        return http.post<IMutationResult>(`${apiUrl}/users/login`, this);
    }
}