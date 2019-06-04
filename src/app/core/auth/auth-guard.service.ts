import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private serviceAuth: AuthService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    console.log('Url:' + url);
    return new Observable<boolean>((observer) => {
      this.serviceAuth.getAccessToken()
        .subscribe(modelToken => {
         //console.log("token: ", modelToken)
          if (modelToken) {
            observer.next(true)
          } else {
            this.router.navigate(['auth'], { queryParams: { returnUrl: state.url } });
            observer.next(false)
          }
          observer.complete()
        }, error => {
          this.router.navigate(['auth'], { queryParams: { returnUrl: state.url } });
          observer.next(false)
          observer.complete()
        })
    });

  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    let url: string = state.url;
    console.log('Url:' + url);

    return new Observable<boolean>((observer) => {
      this.serviceAuth.getAccessToken()
        .subscribe(modelToken => {
          //console.log("token: ", modelToken)
          if (modelToken) {
            observer.next(true)
          } else {
            this.router.navigate(['auth'], { queryParams: { returnUrl: state.url } });
            observer.next(false)
          }
          observer.complete()
        }, error => {
          console.log("erroe: ", error)
          this.router.navigate(['auth'], { queryParams: { returnUrl: state.url } });
          observer.next(false)
          observer.complete()
        })
    });

  }
}
