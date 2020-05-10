import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/login/mutations/login-user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    validateAuthorization(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    login(mutation: LoginUser) {
    
    }
}