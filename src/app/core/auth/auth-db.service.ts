import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ModelToken } from './models';
import { IndexeddbService } from '../db/indexeddb.service';
import { IndexeddbConstant } from '../db/indexeddb-constant';
import { DbToken } from '../db/entity/token';

@Injectable({
  providedIn: 'root'
})
export class AuthDbService {

  
  mAccessToken: ModelToken;
  
  constructor(private indexedDbService: IndexeddbService) {
    console.log("cons", "ServiceLocalAuth");
  }

   /**
     * 
     * @param tokenType (refreshToken or accessToken)
     */
    private hasDataStoreTokenType(tokenType: string): Observable<boolean> {

      console.log("hasDataStoreKeyRefresh1: ");
      return new Observable<boolean>(observer => {
  
        let db = this.indexedDbService.dbInstance();
        db.getByKey('auth', tokenType).then((person) => {
         // console.log(person);
          observer.next(true);
          observer.complete();
        }, (error) => {
          console.log(error);
          observer.next(false);
          observer.complete();
        });
  
      });
  
  
    }
  
    storeToken(token: string, tokenType: string, expireAt: number): Observable<ModelToken> {
      //BehaviorSubject
  
  
      console.log("storeRefreshToken1: ");
      return new Observable<ModelToken>(observer => {
  
        console.log("storeRefreshToken2: ");
  
        this.hasDataStoreTokenType(tokenType).subscribe((success) => {
          // if (tokenType === 'refreshToken') {
          //   this.mRefreshToken = new ModelToken(token, "refreshToken", expireAt);
          // } else 
          if (tokenType === 'accessToken') {
            this.mAccessToken = new ModelToken(token, "accessToken", expireAt);
          } else if (tokenType === IndexeddbConstant.TOKEN_KEY) {
            this.mAccessToken = new ModelToken(token, IndexeddbConstant.TOKEN_KEY, expireAt);
          }
  
          let db = this.indexedDbService.dbInstance();
          if (success) {
            db.update('auth', { token: tokenType, value: token, expireAt: expireAt }).then((value) => {
  
              //console.log("update auth value:", value);
              observer.next(new ModelToken(token, tokenType, expireAt));
              observer.complete();
            },
              (reason) => {
                //console.log("update auth reason:", reason);
  
                observer.error(reason);
                observer.complete();
  
              });
          } else {
            db.add('auth', { token: tokenType, value: token }).then((value) => {
              //console.log("add auth value:", value);
              observer.next(new ModelToken(token, tokenType, expireAt));
              observer.complete();
            },
              (reason) => {
                console.log("add auth reason:", reason);
                observer.next(reason);
                observer.complete();
              });
          }
        },
          (fail) => {
            observer.error(fail);
            observer.complete();
          });
      });
  
    }
  
  
    getToken(tokenType: string): Observable<ModelToken> {
      console.log("hasDataStoreKeyRefresh1: ");
      return new Observable<ModelToken>(observer => {
  
        let db = this.indexedDbService.dbInstance();
        db.getByKey('auth', tokenType).then((token: DbToken) => {
         // console.log("gettoken: ", token);
          if (token) {
  
            let modelToken = new ModelToken(token.value, token.token, token.expiresAt);
            //console.log("modelTOken: ", modelToken);
            observer.next(modelToken);
          } else {
            observer.error("2 not token found");
          }
          observer.complete();
        }, (error) => {
          console.log("gettoken: ", error);
          observer.error(error);
          observer.complete();
        });
  
      });
    }
  
    removeToken(): Promise<any> {
      console.log("remove Token");
      this.mAccessToken = null
      let db = this.indexedDbService.dbInstance();
      return db.clear('auth')
      
      // .then((any: any) => {
        
      //   console.log("removed: ", any);
      // },
      //   (resone: any) => {
      //     console.log("rejected: ", resone);
  
      //   }
      // );
    }
}
