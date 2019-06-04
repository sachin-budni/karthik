import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDbService } from './auth-db.service';
import { IndexeddbConstant } from '../db/indexeddb-constant';
import { ModelToken } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authDbService: AuthDbService) { }



  getAccessToken(): Observable<string> {

    console.log('getAccessToken: ');

    return new Observable<string>(observer => {

      this.authDbService.getToken(IndexeddbConstant.TOKEN_KEY).subscribe(success => {
        //let date = moment.unix(success.expiresAt);
        // let compare = date.diff(moment());
        // if (compare > 0) {
        //   observer.error("token 1 not found");
        //   observer.complete();
        // } else {
        //   observer.next(success);
        //   observer.complete();
        // }
        observer.next(success.token);
        observer.complete();

      },
        (error) => {
          console.log("getAccessToken error:", error);
          observer.error(error);
          observer.complete();
        }
      );
      // this.afAuth.auth.currentUser.getIdToken().then((value: string) => {
      //   console.log('Token: ', value);
      //   observer.next(value);
      //   observer.complete();
      // },
      //   error => {
      //     console.log(error);
      //     observer.next(error);
      //     observer.complete();
      //   });
    });



  }

  saveAccessToken(token: string): Observable<ModelToken> {
    return this.authDbService.storeToken(token, IndexeddbConstant.TOKEN_KEY, 0)
  }

  logOut(): Promise<any> {
    return this.authDbService.removeToken();
  }

  // getAccessToken(): Observable<string> {
  //   return new Observable<string>((observer) => {

  //     this.serviceLocalAuth.getToken(AuthConstant.TOKEN_KEY).subscribe(success => {
  //       let date = moment.unix(success.expiresAt);
  //       let compare = date.diff(moment());
  //       if (compare > 0) {
  //         observer.error("token 1 not found");
  //         observer.complete();
  //       } else {
  //         observer.next(success);
  //         observer.complete();
  //       }

  //     },
  //       (error) => {
  //         console.log("getAccessToken error:", error);
  //         observer.error(error);
  //         observer.complete();
  //       }
  //     );
  //     // ,
  //     //   (error) => {
  //     //     console.log("getAccessToken error:", error);
  //     //     this.requestAccessToken().subscribe((token) => {
  //     //       observer.next(token);
  //     //       observer.complete();

  //     //     },
  //     //       (error) => {
  //     //         console.log("getAccessToken 2 requestAccessToken error: ", error);
  //     //         observer.error(error);

  //     //         observer.complete();
  //     //       });
  //     //   })
  //   });
  // }
}
