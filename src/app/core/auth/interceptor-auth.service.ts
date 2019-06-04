import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


import { mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InterceptorAuthService {

  constructor(private serviceAuth: AuthService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let url = request.url;
    if (url.includes("latest/login")) {

console.log(request.body)
      let body = JSON.parse(request.body)
      let token =body['username'] + ':' + body['password']
      console.log(token)
      token = btoa(token)
      console.log(token)
      if (token) {
        // clone and modify the request
        request = request.clone({
          setHeaders: {
            Authorization: `Basic ${token}`
          },
          params: null
        });
      }

      return next.handle(request);
      //return next.handle(request);
    } else
      return this.serviceAuth.getAccessToken().pipe(mergeMap((token: String, htt) => {

        if (token) {
          // clone and modify the request
          request = request.clone({
            setHeaders: {
              Authorization: `Token ${token}`
            }
          });
        }

        return next.handle(request);
      })
      )
  }
}
