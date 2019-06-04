import { Injectable } from '@angular/core';
//import { AngularIndexedDB } from 'ngx-indexed-db';

import { AngularIndexedDB } from 'angular2-indexeddb';
// import { IndexedDBDatabase, LocalStorage } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {
  private db: AngularIndexedDB
  constructor() {
    this.db = new AngularIndexedDB(environment.indexeddb, 1);
  }

/**
 * only used in provider
 */
  initializeDb() {
    return new Promise((resolve, reject) => {
      console.log(`initializeApp:: inside promise`);

      setTimeout(() => {
        this.createInstance().then((success) => {
          //console.log(success);
          resolve();
        },
          (error) => {
            console.log("initializeDb", error);
            resolve();

          })
        // doing something

      });
    });
  }

  dbInstance(): AngularIndexedDB {
    return this.db;
  }

  createInstance(): Promise<any> {
    return this.dbInstance().openDatabase(1, evt => {
      console.log("createInstacne")
      let objectStore = evt.currentTarget.result.createObjectStore(
        'auth', { keyPath: "token" });
      objectStore.createIndex("token", "token", { unique: true });

    });
  }

  openConnection(): Observable<AngularIndexedDB>{
    return new Observable<AngularIndexedDB>(observer=>{

         observer.next(this.dbInstance());
         observer.complete();
    //     this.dbInstance().(1).then((success)=>{
    //         observer.next(this.dbInstance());
    //         observer.complete()
    //     },
    // (fail)=>{
    //     observer.error(fail);
    // })
    });
    
   
}


}
