import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    private formatErrors = (error: any) => {
        if (error.status === 401) {
            this.router.navigate(['/unauth']);
            return of(false)
        }
        return of(true);
    }

    checkLogin(url): Observable<any> {
        const body = {};
        const value = [
            'dashboard',
            'system',
            'report',
            'config'
        ].find((e) => {
            if (url.indexOf(e) !== -1) {
                return true;
            }
            return false;
        })
        return this.http.post(
            `${environment.api_url}check/${value}`,
            JSON.stringify(body),
          ).pipe(catchError(this.formatErrors)).pipe(map((data: any) => {
              return true
          }));
    }


}
