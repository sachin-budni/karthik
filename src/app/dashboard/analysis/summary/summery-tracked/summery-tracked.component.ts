import { Component, OnInit } from '@angular/core';
import { ChartjsPolar, ChartjsPolarData, ChartjsDoughuntData, ChartjsDoughunt } from 'src/app/shared/charts/models';
import { Subscription } from 'rxjs';
import { SharedDataService, ApiAnalysisService } from 'src/app/service';
import { map } from 'rxjs/operators';
import { ResponseTrip, ResponseTripV2 } from 'src/app/service/api/params';
import { TbSelected } from 'src/app/tb';
import { ModelOverview } from '../../overview/models';
import { ModelDateRange } from 'src/app/shared/filters/filter-days/models';
import { ModelMapTop3 } from '../../heat-map/heat-map-detail/models';


@Component({
  selector: 'app-summery-tracked',
  templateUrl: './summery-tracked.component.html',
  styleUrls: ['./summery-tracked.component.scss']
})
export class SummeryTrackedComponent implements OnInit {

  _mSourceAndDestinationButton:number = 1;
  mSubscription: Subscription
  _mIsLoading = false;
  mChartTrackable: ChartjsDoughunt
  //mChartConcent: ChartjsDoughunt
  _mLeftChart: ChartjsDoughunt

  mTrackableOverview: ModelOverview;
  mConcentOverview: ModelOverview= new ModelOverview("");
  _mLeftOverview: ModelOverview = new ModelOverview("")

  _mChartPod: ChartjsDoughunt

  mFilterDay = new ModelDateRange('year')
  
  _mTotalTrip: String;
  _mQuntity: String;
  _mDelay: String;
  mTrackable: number = 0;

  _mLeftIsTrackable = true;

  _mOverviewSource: ModelMapTop3 = new ModelMapTop3('srcname');
  _mOverviewDest: ModelMapTop3 = new ModelMapTop3('destname');

  constructor(
    private apiAnalysisService: ApiAnalysisService, private sharedDataService: SharedDataService) { }

  ngOnInit() {
    setTimeout(() => {

      this.subscribeData()
    })
    setTimeout(() => {
      // this.mChartTrackable = this.createPolar([6768, 2267], [
      //   "#14E66E", "#9e9e9e"
      // ], ["Trackable", "Un-Trackable"])
      
    })
  }

  _onFilterRangeChange($event: ModelDateRange){
    this.mFilterDay = $event
    this.subscribeData()

  }

  onSelectionGroupChange(event){
    this._mSourceAndDestinationButton = event.value;
    console.log(this._mSourceAndDestinationButton);
  }

  subscribeData() {

    this._mIsLoading = true;
    this.mSubscription = this.apiAnalysisService.tripsV2(this.mFilterDay.starttime, this.mFilterDay.endtime)
      .pipe(
        map((val: ResponseTripV2)=>val.current_period),
        map((val: ResponseTrip[]) => {
          console.log("vaL v2: ", val)


          let series = []


          this._mTotalTrip = val.length.toString()
          //val[0]
          this.mTrackable = this.calcTrackable(val)
          this.mChartTrackable = this.createDoughnut([this.mTrackableOverview.counts, val.length - this.mTrackableOverview.counts], [
            "#f56761", "#dfdfdf"
          ], ["Not Tracked", "Tracked"])

          // this.mChartConcent = this.createDoughnut([34, 66], [
          //   "#3e95cd", "#14E66E"
          // ], ["Trackable", "Consent Allowed"])
       
          return val
        })
      ).subscribe((val: ResponseTrip[]) => {
        console.log("trackable 12: ", this.mChartTrackable);
       this._mLeftChart = this.mChartTrackable
        this._mLeftOverview = this.mTrackableOverview
        this._mOverviewSource.setTrips(this.mTrackableOverview.trips);
        this._mOverviewDest.setTrips(this.mTrackableOverview.trips);
        // this._mOverviewDest = _modeoverView.trips
        

        // let chartHighStockSeries = new ChartHighStockSeries();
        //     chartHighStockSeries.data = series;
        //     let chartHighStock = new ChartHighStock(chartHighStockSeries, this.mColor);
        //     chartHighStock.useTime = false;
        //     this._mIsLoading = false;
        //     this._mChartHighStock = chartHighStock;
      })
  }

 


  calcTrackable(val: ResponseTrip[]): number {
    let pointer = 0
    val.forEach(element => {
      pointer += element.trackable ? 1 : 0
    });
    let trackableOverview = new ModelOverview('tracked')
    trackableOverview.setTrips(val, 'bool', false);
    this.mTrackableOverview = trackableOverview;
    //this.mTrackableOverview.trip
    //console.log("check: ", this.mTrackableOverview);

    // this._mDelay = pointer.toString()
    return pointer
  }

 
  // calcConcent(val: ResponseTrip[]): number {
  //   let pointer = 0
  //   val.forEach(element => {
  //     pointer += element. ? 1 : 0
  //   });

  //   // this._mDelay = pointer.toString()


  //   return pointer
  // }

  createPolar(data: any[], colors: string[], labels: string[]): ChartjsPolar {
    // let data = [];
    // let colors = [];
    // let labels = [];
    // this._mPlotObjects.forEach(element => {
    //   data.push(this.randomScalingFactor());
    //   colors.push(element.color);
    //   labels.push(element.name);
    // });


    let chartPieDta = new ChartjsPolarData();
    chartPieDta.data = data;
    chartPieDta.backgroundColor = colors;
    let chartPie = new ChartjsPolar();
    chartPie.data = chartPieDta;
    chartPie.labels = labels;

    return chartPie;
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
