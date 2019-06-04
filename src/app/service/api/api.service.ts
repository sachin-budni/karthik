import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  doGetObservable(url): Observable<any> {
    // console.log(url);
    return this.http.get(url, { headers : this.headers });
  }

  // doGetWithDataObservable(url, data): Observable<any> {
  //   // console.log(url);
  //   return this.http.get(url, JSON.stringify(data), { headers : this.headers });
  // }

  doGetObservableForQuery(url, params): Observable<any> {
    // console.log(url);
    return this.http.get(url, { headers: this.headers, params: params });
  }

  //Post
  doPostObservable(url, data): Observable<any> {
    return this.http.post(url, JSON.stringify(data), { headers : this.headers });
  }

}
