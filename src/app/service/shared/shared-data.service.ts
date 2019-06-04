import { Injectable, EventEmitter } from '@angular/core';
import { ApiAnalysisService } from '../api/api-analysis.service';
import { from } from 'rxjs';
import { ResponseTrip, ResponseTripV2 } from '../api/params';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  data: any[];



  constructor(
    private apiAnalysisService: ApiAnalysisService) {
    this.data = [];
  }
  /* *****************************************************************************************************************************
   *                                                    Shared dataevents
   */

  mSubscriptionError = (error) => {
    console.log("error: ", error);
  };


  /* *****************************************************************************************
   *                                                    Sales performance
   */
  eventAnalysis: EventEmitter<ResponseTrip[]> = new EventEmitter<ResponseTrip[]>();


  getAnalysisEmitter(reqApi: Boolean): EventEmitter<ResponseTrip[]> {

    let filter = this.getData(SharedDataService.ANALYSIS.reqFilter)

    let subscriptionV2 = (value: ResponseTripV2) => {
      //console.log("items: ", value);
      this.setData(SharedDataService.ANALYSIS.data, value);
      this.emitAnalysis();
    };

    // console.log("fitler: ", filter);
    let data = this.getData(SharedDataService.ANALYSIS.data);

    if (reqApi) {

      //  console.log("req: 2", new Date().valueOf());
      this.apiAnalysisService.tripsV2().subscribe(subscriptionV2, this.mSubscriptionError)

    } else {

      if (data) {
        setTimeout(() => { this.emitAnalysis() }, 5);
      }
    }
    return this.eventAnalysis;
  }

  updateAnalysisQuery(client: String, limit: String = 'all') {
    this.setData(SharedDataService.ANALYSIS.reqFilter, {
      client: client,
      limit: limit
    })
    this.getAnalysisEmitter(true);
  }


  emitAnalysis() {
    let data = this.getData(SharedDataService.ANALYSIS.data);
    if (data) {
      console.log("data: ", data);
      
      this.eventAnalysis.emit(data.current_period);
      this.remove(SharedDataService.ANALYSIS.data)
    }
  }


  /* ***********************************************************************************************************************************
   *                                                                      mapping
   */


  static COMMON = {
    storeList: "common.stores",
    itemList: "common.items"
  }

  static ANALYSIS = {
    data: "analysis.data",
    reqFilter: "analysis.reqFilter"
  };


  setData(key: string, pData: any) {
    this.data[key] = pData;
  }

  getData(key) {
    if (key in this.data) {
      return this.data[key];
    }
    else undefined;
  }

  setMapData(key: string, mapKey: string, pData: any): boolean {
    if (!(mapKey))
      return false;
    let map;

    if (this.data[key]) {
      map = this.data[key];
    } else {
      this.data[key] = {};
      map = this.data[key];
    }

    map[mapKey] = pData;
    return true;

  }


  getMapData(key: string, mapKey: string) {
    if (key in this.data) {
      let data = this.data[key];
      if (mapKey in data) {
        return data[mapKey];
      }
    }
    else undefined;
  }

  removeMap(key: string, mapKey: string) {
    if (key in this.data && this.data[key]) {
      if (mapKey in this.data[key] && this.data[key][mapKey]) {
        delete this.data[key][mapKey];
      }
    }
  }

  remove(key) {
    if (key in this.data && this.data[key]) {
      delete this.data[key];
    }
  }
}
