import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  httpOptions: object;

  constructor(
    private http: HttpClient,
  ) {
    this.httpOptions = {
    };
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      this.httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  download(path, body: object): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`,
    JSON.stringify(body),
    { observe: 'response', responseType: 'blob' }).pipe(catchError(this.formatErrors));
  }
}
