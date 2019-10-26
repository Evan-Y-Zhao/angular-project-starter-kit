import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  // Wenjie
  target: any = 'wenjie.yang@thermofisher.com';

  // Fanling
  // target: any = 'ling.fan2@thermofisher.com';

  // Sunlei
  // target: any = 'sun.lei@thermofisher.com';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Sprox-Principal-id': '50a8fe90-17d3-4cff-9a6d-64761ef3ac4d',
    };
    const request = req.clone({ setHeaders: headersConfig, withCredentials: true});
    return next.handle(request);
  }
}
