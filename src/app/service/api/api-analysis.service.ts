import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { isUndefined } from 'util';
import { Observable } from 'rxjs/internal/Observable';
import { ArrayUtil } from 'src/app/utils';
import { map } from 'rxjs/operators';
import { ApiUrls } from '../api-urls';
import { ResponseTrip, ResponseTripV2 } from './params';

@Injectable({
  providedIn: 'root'
})
export class ApiAnalysisService {

  constructor(private apiService: ApiService, private apiUrls: ApiUrls) { }


  trips(client: String = 'proconnect', limit: String = 'All'): Observable<ResponseTrip[]> {
    let params = {
      client: client,
      limit: limit
    }

    console.log("params: ", params)
    let requestUrl = ApiUrls.BASE_URL + this.apiUrls.analysis().trips;
    return this.apiService.doGetObservableForQuery(requestUrl, params).pipe(
      map(res => {
        if (res) {
          //console.log("transactions: ", res);
          return res
          //return this.processPredicData(res.data)
        }
        return [];
      })
    )
  }

  tripsV2(starttime: number=1525026223000, endtime: number = 1556562223000, limit: String = 'all'): Observable<ResponseTripV2> {
    let params = {
      limit: limit,
      starttime: starttime,
      endtime:endtime
    }

    console.log("params: ", params)
    let requestUrl = ApiUrls.BASE_URL + this.apiUrls.analysis().tripsV2;
    return this.apiService.doGetObservableForQuery(requestUrl, params).pipe(
      map(res => {
        if (res) {
          //console.log("transactions: ", res);
          return res
          //return this.processPredicData(res.data)
        }
        return [];
      })
    )
  }



}
