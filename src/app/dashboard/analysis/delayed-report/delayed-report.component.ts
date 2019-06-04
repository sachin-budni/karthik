import { Component, OnInit } from '@angular/core';
import { ChartjsBar, ChartjsBarData } from 'src/app/shared/charts/models';
import { Subscription } from 'rxjs';
import { SharedDataService, ApiAnalysisService } from 'src/app/service';
import { ResponseTrip, ResponseTripV2 } from 'src/app/service/api/params';
import { map } from 'rxjs/operators';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { TransportersTrip, LanesTrip, ClientsTrip } from './models';
import { TbSelected } from 'src/app/tb';
import { MatButtonToggleChange } from '@angular/material';
import { ModelDateRange } from 'src/app/shared/filters/filter-days/models';

@Component({
  selector: 'app-delayed-report',
  templateUrl: './delayed-report.component.html',
  styleUrls: ['./delayed-report.component.scss']
})
export class DelayedReportComponent implements OnInit {
  
  matSliderValue:number = 6;
  mSubscription: Subscription
  _mIsLoading = false;

  _mChartDelayed: ChartjsBar;

  mTransportersTrip: TransportersTrip;
  mLanesTrip: LanesTrip;
  mClientsTrip: ClientsTrip;

  mChartDelayedTransporters: ChartjsBar
  mChartDelayedLanes: ChartjsBar
  mChartDelayedClients: ChartjsBar

  mFilterDay = new ModelDateRange('year')

  mChartDelayedTransportersPercent: ChartjsBar
  mChartDelayedLanesPercent: ChartjsBar
  mChartDelayedClientsPercent: ChartjsBar
  _mCurrentChartState: 'percent'| 'absolute'="percent";
  mIsTransport: boolean;
  mChartType: any = 1;
  
  constructor(
    private apiAnalysisService: ApiAnalysisService,
    private sharedDataService: SharedDataService) { }

  ngOnInit() {

    setTimeout(() => {

      this.subscribeData()
    })
    // setTimeout(() => {
    //   this._mChartDelayed = this.createBarDetail()
    // })
  }

  _onFilterRangeChange($event: ModelDateRange){
    this.mFilterDay = $event
    this.subscribeData()

  }
  
  matSliderData(event){
    let time = event.value*60*60*1000;
    //if(this.mChartType == 1){

      this.mTransportersTrip.delay(time);
    //}
    //if(this.mChartType == 2){
      this.mLanesTrip.delay(time);
    //}
    //if(this.mChartType == 3){
      this.mClientsTrip.delay(time);
    //}
    this.updateChart();
  }

  subscribeData() {

    this._mIsLoading = true;
    this.mSubscription = this.apiAnalysisService.tripsV2(this.mFilterDay.starttime, this.mFilterDay.endtime)
      .pipe(
        map((val: ResponseTripV2)=>val.current_period),
        map((val: ResponseTrip[]) => {
          let result = val.filter((val)=>{
            return val.delay
          })
          // console.log("reuslt: ", result);
          
          return result
        }),
        map((val: ResponseTrip[]) => {
          // console.log("vaL3: ", val)

          let clientsTrip = new ClientsTrip()
          clientsTrip.setTrips(val);
          //console.log("client: ", clientsTrip);
          this.mClientsTrip = clientsTrip
          let delayReport = this.mClientsTrip.getDelayReport()
          this.mChartDelayedClients = this.createBarChart(delayReport[0], delayReport[1], delayReport[2], this.mClientsTrip.getNames())
          delayReport = this.mClientsTrip.getDelayReportPercent()
          this.mChartDelayedClientsPercent = this.createBarChart(delayReport[0], delayReport[1], delayReport[2], this.mClientsTrip.getNames())


          let lanesTrip = new LanesTrip()
          lanesTrip.setTrips(val);
          //console.log("lane: ", lanesTrip);
          this.mLanesTrip = lanesTrip
          delayReport = this.mLanesTrip.getDelayReport()
          this.mChartDelayedLanes = this.createBarChart(delayReport[0], delayReport[1], delayReport[2], this.mLanesTrip.getNames())
          delayReport = this.mLanesTrip.getDelayReportPercent()
          this.mChartDelayedLanesPercent = this.createBarChart(delayReport[0], delayReport[1], delayReport[2], this.mLanesTrip.getNames())

          let tranporterTrips = new TransportersTrip()
          tranporterTrips.setTrips(val);
          //console.log("transporter: ", tranporterTrips);
          this.mTransportersTrip = tranporterTrips
          delayReport = this.mTransportersTrip.getDelayReport()
          this.mChartDelayedTransporters = this.createBarChart(delayReport[0], delayReport[1], delayReport[2], 
            this.mTransportersTrip.getNames())
          delayReport = this.mTransportersTrip.getDelayReportPercent()
          this.mChartDelayedTransportersPercent = this.createBarChart(delayReport[0], delayReport[1], delayReport[2], 
            this.mTransportersTrip.getNames())
          //val[0]

          return val
        })
      ).subscribe((val: ResponseTrip[]) => {

        // let delayReport = this.mTransportersTrip.getDelayReport()
       // this._mChartDelayed = this.mChartDelayedClients
       this.updateChart()

        // let chartHighStockSeries = new ChartHighStockSeries();
        //     chartHighStockSeries.data = series;
        //     let chartHighStock = new ChartHighStock(chartHighStockSeries, this.mColor);
        //     chartHighStock.useTime = false;
        //     this._mIsLoading = false;
        //     this._mChartHighStock = chartHighStock;
      })
  }

  onToggleGroupChange($event: MatButtonToggleChange){
    console.log("onTogglechange: ",$event);

    this._mCurrentChartState = $event.value
    this.updateChart()
  }
  onSelectionGroupChange($event: TbSelected) {
    //console.log("selecton change: ", $event);
    this.mChartType  = $event.value
    // if ($event.value == 1) {
    // } else if ($event.value == 2) {
    //   //console.log("selction change 2: ",  this.mChartDelayedLanes);
    //   this._mChartDelayed = this.mChartDelayedLanes
    // } else {
    //   this._mChartDelayed = this.mChartDelayedTransporters
    // }

    this.updateChart()

  }

  updateChart(){

    if(this._mCurrentChartState == "percent"){
      console.log("percent: ");
      
      if(this.mChartType == 3){
        this._mChartDelayed = this.mChartDelayedClientsPercent
      } else if (this.mChartType == 2) {
        this._mChartDelayed = this.mChartDelayedLanesPercent
      } else {
        this._mChartDelayed = this.mChartDelayedTransportersPercent
      }
    }else{
      if(this.mChartType == 3){
        this._mChartDelayed = this.mChartDelayedClients
      } else if (this.mChartType == 2) {
        this._mChartDelayed = this.mChartDelayedLanes
      } else {
        this._mChartDelayed = this.mChartDelayedTransporters
      }
    }
    
  }


  createTrip() {

  }




  // extractTransporter(vals: ResponseTrip[]){
  //   let mapKey = []
  //   mapKey.push('default')
  //   let data = []
  //   vals.forEach(element => {
  //     if(element.transporter){
  //       let posi = mapKey.indexOf(element.transporter)
  //       if(posi<0){
  //         mapKey.push(element.transporter)
  //         data[element.transporter]=[]
  //       }
  //       data[element.transporter].push(element)
  //     }else{
  //       if(!(data['default'])){
  //         data['default'] = []

  //       }
  //       data['default'].push(element)
  //     }
  //   });

  //   let modelTrips = new ModelDelayedTrips()
  //   modelTrips.setTrips(data, mapKey)
  //   return modelTrips

  // }



  createBarChart(onTime: any[], delayed: any[], delayedMore: any[], labels: any[]) {
    let chartjsBar = new ChartjsBar();

    // let label = (i === 0) ? "Category: Milk" : "Products: CORN/MAIZ";
    let chartBarDta = new ChartjsBarData();
    chartBarDta.data = onTime;
    chartBarDta.backgroundColor = '#13CE90';
    chartBarDta.label = 'On Time';
    chartjsBar.data.push(chartBarDta);

    chartBarDta = new ChartjsBarData();
    chartBarDta.data = delayed;
    chartBarDta.backgroundColor = '#FFDC51';
    chartBarDta.label = 'less than 6hrs';
    chartjsBar.data.push(chartBarDta);

    chartBarDta = new ChartjsBarData();
    chartBarDta.data = delayedMore;
    chartBarDta.backgroundColor = '#F56761';
    chartBarDta.label = 'more than 6hrs';
    chartjsBar.data.push(chartBarDta);

    chartjsBar.labels = labels;
    chartjsBar.fontColor = '#35CEA5';


    return chartjsBar;
  }


  // createBarDetail(): ChartjsBar {

  //   let dataSets1: String[] = ['30', '20', '60', '20', '20', '70', '20', '50', '40']
  //   let dataSets2: String[] = ['20', '40', '20', '40', '10', '20', '60', '20', '40']
  //   let dataSets3: String[] = ['50', '40', '20', '40', '70', '10', '20', '30', '20']

  //   let destination: String[] = ["Transporter 1", "Transporter 1", "Transporter 1", "Transporter 1", "Transporter 1", "Transporter 1", "Transporter 1", "Transporter 1", "Transporter 1"];


  //   let chartjsBar = new ChartjsBar();

  //   // let label = (i === 0) ? "Category: Milk" : "Products: CORN/MAIZ";
  //   let chartBarDta = new ChartjsBarData();
  //   chartBarDta.data = dataSets1;
  //   chartBarDta.backgroundColor = '#F56761';
  //   chartBarDta.label = 'On Time';
  //   chartjsBar.data.push(chartBarDta);

  //   chartBarDta = new ChartjsBarData();
  //   chartBarDta.data = dataSets2;
  //   chartBarDta.backgroundColor = '#FFDC51';
  //   chartBarDta.label = 'less than 6hrs';
  //   chartjsBar.data.push(chartBarDta);

  //   chartBarDta = new ChartjsBarData();
  //   chartBarDta.data = dataSets3;
  //   chartBarDta.backgroundColor = '#13CE90';
  //   chartBarDta.label = 'more than 6hrs';
  //   chartjsBar.data.push(chartBarDta);

  //   chartjsBar.labels = destination as string[];
  //   chartjsBar.fontColor = '#35CEA5';


  //   return chartjsBar;
  // }

}
