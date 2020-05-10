import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.search(environment.api_url) === -1)
      return next.handle(req);

    const token = localStorage.getItem('token');
    const headers = token ? req.headers.set('Authorization', 'Bearer ' + token) : req.headers;

    const authReq = req.clone({ headers });
    return next.handle(authReq)
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['login']);
          }
          return throwError(err);
        })
      );
  }
}