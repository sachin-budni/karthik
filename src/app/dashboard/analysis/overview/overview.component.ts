import { Component, OnInit } from '@angular/core';
import { ChartjsDoughunt, ChartjsDoughuntData } from 'src/app/shared/charts/models';
import { Subscription } from 'rxjs';
import { SharedDataService, ApiAnalysisService } from 'src/app/service';
import { map } from 'rxjs/operators';
import { ResponseTrip, ResponseTripV2 } from 'src/app/service/api/params';
import { calcBindingFlags } from '@angular/core/src/view/util';
import { NamedTrip } from '../delayed-report/models';
import { ModelOverviewRepeat, ModelOverview } from './models';
import { ModelDateRange } from 'src/app/shared/filters/filter-days/models';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  private transporters: string[]
  // private trips: NamedTrip[] = []
  // private lanes: string[]
  // private data: ResponseTrip[][] = []

  // getNames(): string[] {
  //   return this.lanes
  // }

  mFilterDay = new ModelDateRange('year')

  mSubscription: Subscription
  _mIsLoading = false;
  _mDelayedChartDoughnut: ChartjsDoughunt;

  _mTotalTrip: String;
  _mQuntity: String;
  _mDelay: String;

  _mOverviewDelay: ModelOverview = new ModelOverview('delay');
  _mOverviewTrip: ModelOverview = new ModelOverview('');

  constructor(
    private apiAnalysisService: ApiAnalysisService, private sharedDataService: SharedDataService) { }

  ngOnInit() {

    setTimeout(() => {

      this.subscribeData()
    })
  }

  _onFilterRangeChange($event: ModelDateRange){
    this.mFilterDay = $event
    this.subscribeData()

  }


  subscribeData() {

    this._mIsLoading = true;
    this.mSubscription = this.apiAnalysisService.tripsV2(this.mFilterDay.starttime, this.mFilterDay.endtime)
      .pipe(
        map((val: ResponseTripV2) => {
          // console.log("va32L2: ", val)


          let series = []

          this.calcQunatity(val)
          this.calcTrip(val)

          // this._mTotalTrip = val.length.toString()
          //val[0]
         // this.dummyFunc(val)


          return val
        })
      ).subscribe((val: ResponseTripV2) => {
        let delayed = this.calcDelayed(val)


        this._mDelayedChartDoughnut = this.createDoughnut([delayed, val.current_period.length - delayed], [
          '#1FD318'
        ], ["# of delayed"])

       
      })
  }

  calcTrip(val: ResponseTripV2): any {
    let overview = new ModelOverview('')
    overview.setTrips(val.current_period)
    overview.setLastTrips(val.previous_period)

    this._mOverviewTrip = overview

    this._mTotalTrip = overview.counts.toString()
    
    // console.log("overview trips: ", overview);
    
    return overview.counts
  
  }

  calcDelayed(val: ResponseTripV2): any {
    let overviewDelay = new ModelOverview('delay')
    overviewDelay.setTrips(val.current_period)
    overviewDelay.setLastTrips(val.previous_period)
   
    this._mOverviewDelay = overviewDelay

    this._mDelay = overviewDelay.counts.toString()
    
    
    //console.log("overview delay: ", overviewDelay);
    
    return overviewDelay.counts
  }


  calcQunatity(val: ResponseTripV2): any {
    let quantity = 0
    val.current_period.forEach(element => {
      quantity += element.quantity
    });

    if (quantity == 0) {
      quantity = Math.floor(Math.random() * 100000)
    }
    if (quantity > 1000) {
      quantity = quantity / 1000
      quantity = Math.round(quantity)
      this._mQuntity = quantity + "k"
    } else {
      this._mQuntity = quantity.toString()
    }
    //console.log(this._mQuntity);

  }

  dummyFunc(vals: ResponseTrip[]): any {
    let mapKey = []
    let largest = 0;

    //mapKey.push('default')
    let data = []
    vals.forEach($element => {
      //console.log($element.lane);
      //console.log($element.lane.length);

      // if (element.lane) {
      //   let posi = mapKey.indexOf(element.lane)
      //   if (posi < 0) {
      //     mapKey.push(element.lane)
      //     data[element.lane] = []
      //   }
      //   data[element.lane].push(element)
      // } else {
      //   if (!(data['other'])) {
      //     data['other'] = []
      //   }
      //   data['other'].push(element)
      // }
    });
  
    // if (data['other']) {
    //   mapKey.push('other')
    // }

    // mapKey.forEach(element => {
    //   // this.data.push(mappedTrips[element])
    //   let trip = new NamedTrip()
    //   trip.setTrip(data[element], element)
    //   this.trips.push(trip);
    // });
    // this.lanes = mapKey
    // console.log("getting data");
    
  }
  createDoughnut(data: any[], colors: string[], labels: string[]): ChartjsDoughunt {
    // let data = [];
    // let colors = [];
    // let labels = [];
    // this._mPlotObjects.forEach(element => {
    //   data.push(this.randomScalingFactor());
    //   colors.push(element.color);
    //   labels.push(element.name);
    // });


    let chartPieDta = new ChartjsDoughuntData();
    chartPieDta.data = data;
    chartPieDta.backgroundColor = colors;
    let chartPie = new ChartjsDoughunt();
    chartPie.data = chartPieDta;
    chartPie.labels = labels;

    return chartPie;
  }

}
