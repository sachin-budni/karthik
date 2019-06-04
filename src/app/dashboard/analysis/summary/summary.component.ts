import { Component, OnInit } from '@angular/core';
import { ChartjsPolar, ChartjsPolarData, ChartjsDoughuntData, ChartjsDoughunt } from 'src/app/shared/charts/models';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/service';
import { map } from 'rxjs/operators';
import { ResponseTrip } from 'src/app/service/api/params';
import { TbSelected } from 'src/app/tb';
import { ModelOverview } from '../overview/models';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  _mSourceAndDestinationButton:number = 1;
  _prograssTitle:string= 'Source';
  mSubscription: Subscription
  _mIsLoading = false;
  mChartTrackable: ChartjsDoughunt
  mChartConcent: ChartjsDoughunt
  _mLeftChart: ChartjsDoughunt

  mTrackableOverview: ModelOverview;
  mConcentOverview: ModelOverview= new ModelOverview("");
  _mLeftOverview: ModelOverview = new ModelOverview("")

  _mChartPod: ChartjsDoughunt

  _mTotalTrip: String;
  _mQuntity: String;
  _mDelay: String;
  mTrackable: number = 0;

  _mLeftIsTrackable = true;
  _mRightChart: ChartjsDoughunt;

  constructor(private sharedDataService: SharedDataService) { }

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

  subscribeData() {

    this._mIsLoading = true;
    this.mSubscription = this.sharedDataService.getAnalysisEmitter(false)
      .pipe(
        map((val: ResponseTrip[]) => {
          //console.log("vaL2: ", val)


          let series = []


          this._mTotalTrip = val.length.toString()
          //val[0]
          this.mTrackable = this.calcTrackable(val)
          this.mChartTrackable = this.createDoughnut([this.mTrackableOverview.counts, val.length - this.mTrackableOverview.counts], [
            "#14E66E", "#dfdfdf"
          ], ["Trackable", "Un-Trackable"])

          // this.mChartConcent = this.createDoughnut([34, 66], [
          //   "#3e95cd", "#14E66E"
          // ], ["Trackable", "Consent Allowed"])
          this.calcConcent(val)
          this.mChartConcent = this.createDoughnut([this.mConcentOverview.counts, val.length - this.mConcentOverview.counts], [
            "#14E66E", "#dfdfdf"
            ], ["Concent Allowed", "Consent Not Allowed"])

            this._mRightChart = this.createDoughnut([ val.length - this.mConcentOverview.counts,this.mConcentOverview.counts], [
              "#dfdfdf", "#f56761"
              ], ["Allowed", "Not Allowed"])
          return val
        })
      ).subscribe((val: ResponseTrip[]) => {
        console.log("trackable 12: ", this.mChartTrackable);
       this._mLeftChart = this.mChartTrackable
        this._mLeftOverview = this.mTrackableOverview
       


        // let chartHighStockSeries = new ChartHighStockSeries();
        //     chartHighStockSeries.data = series;
        //     let chartHighStock = new ChartHighStock(chartHighStockSeries, this.mColor);
        //     chartHighStock.useTime = false;
        //     this._mIsLoading = false;
        //     this._mChartHighStock = chartHighStock;
      })
  }

  onSelectionSourceAndDestBut(event){
    this._prograssTitle = event.value == 1? "Source":"Destination";
    // console.log(event)
  }

  onSelectionGroupChange($event: TbSelected) {

    if ($event.value == 1) {
      console.log("trackable: ", this.mChartTrackable);
      
      this._mLeftChart = this.mChartTrackable
      this._mLeftOverview = this.mTrackableOverview
      this._mLeftIsTrackable = true
    } else {
      this._mLeftChart = this.mChartConcent
      this._mLeftOverview = this.mConcentOverview
      this._mLeftIsTrackable = false
    }
    //console.log("selecton change: ", this._mLeftChart);        

  }


  calcTrackable(val: ResponseTrip[]): number {
    let pointer = 0
    val.forEach(element => {
      pointer += element.trackable ? 1 : 0
    });
    let trackableOverview = new ModelOverview('trackable')
    trackableOverview.setTrips(val, 'bool', true)
    this.mTrackableOverview = trackableOverview

    //console.log("check: ", this.mTrackableOverview);

    // this._mDelay = pointer.toString()
    return pointer
  }

  calcConcent(val: ResponseTrip[]): number {
    let pointer = 0
    val.forEach(element => {
      pointer += element.trackable ? 1 : 0
    });
    let concentOverview = new ModelOverview('truck_type')
    concentOverview.setTrips(val, 'string', '32 ft.')
    this.mConcentOverview = concentOverview

    //console.log("check: ", this.mConcentOverview);
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
