import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/login/mutations/login-user';
import { User } from 'src/app/login/mutations/view-models/user-result';
import { MutationsHandlerService } from '../handlers/mutation-handler-service';
import { LoginResult } from 'src/app/login/mutations/view-models/login-result';
import { BehaviorSubject } from 'rxjs';
import { SnackService } from './snack-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser: BehaviorSubject<User>;

    constructor(
        private router: Router,
        private snackService: SnackService,
        private mutationsHandler: MutationsHandlerService
    ) {
        const item = localStorage.getItem('user');
        const user = item ? JSON.parse(atob(item)) : null;
        this.currentUser = new BehaviorSubject(user);
    }

    validateAuthorization(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    login(mutation: LoginUser) {
        this.mutationsHandler.handle(mutation).subscribe(rs => {
            const result = rs.data as LoginResult;
            const user = { id: result.id, name: result.name } as User;
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', btoa(JSON.stringify(user)));
            this.router.navigate(['announcements']);
            this.currentUser.next(user);
        }, err => {
            this.snackService.open('Usuário ou senha inválidos');
        });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/announcements']);
    }
}