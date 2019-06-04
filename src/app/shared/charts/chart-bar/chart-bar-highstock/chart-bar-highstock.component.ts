import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import * as HighCharts from 'highcharts/highstock';
import { ChartHighStock, ChartHighStockSeries, ChartjsBar } from '../../models';
@Component({
  selector: 'app-chart-bar-highstock',
  templateUrl: './chart-bar-highstock.component.html',
  styleUrls: ['./chart-bar-highstock.component.scss']
})
export class ChartBarHighstockComponent implements OnInit {

  mHasDataSet: boolean;
  mIsInitialized: any;

  mChart: Highcharts.Chart;

  // mData;
  //mUseTime: Boolean = false;

  //mColor: String = '#1BBF6D';//'#0067B8'; // '#1BBF6D';
  mSeries: any;
  mSeriesList = [];
  mLabels = []

  @ViewChild('container', { read: ElementRef }) container: ElementRef;

  @Input() set model(value: ChartjsBar) {
    // console.log("called: model");
    if (value) {
      if (value.data && value.data.length > 0) {
        this.initSeries(value);
      }
    }
    // console.log("input: ", value);
    if (this.mIsInitialized) {
      // console.log("cretea from input: ");
      this.createChart();
    } else {
      this.mHasDataSet = true;
    }
  }

  constructor() {
    this.mSeries = {
      name: 'AAPL',
      data: []
    };
  }

  ngOnInit() {
    setTimeout(() => {

      if (this.mHasDataSet && this.mSeries && this.mSeries.data) {
        // this.mData = this.mSeries.data;

        this.createChart();
      }
      this.mIsInitialized = true;
    })
  }

  private createChart() {
    this._mConfig.series = this.mSeriesList;
    if(this.mLabels.length<9){
      this._mConfig.xAxis.max = this.mLabels.length -1
    }else{
      this._mConfig.xAxis.max = 8
    }
    
    console.log("config: ", this._mConfig)
    //this._mConfig.xAxis.categories = this.mLabels;
    this.mChart = HighCharts.chart(this.container.nativeElement,
      this._mConfig as any);
  }


  private initSeries(pChartjsBar: ChartjsBar): any {


    let seriesList = [];
    pChartjsBar.data.forEach((pData, index) => {
      let series = new ChartHighStockSeries()
      series.data = pData.data.map((value, index) => [pChartjsBar.labels[index], value])
      series.color = pData.backgroundColor
      series.name = pData.label

      seriesList.push(series);

    });
    this.mLabels = pChartjsBar.labels
    this.mSeriesList = seriesList;
    console.log("series: ", this.mSeriesList);

    // let sds: IndividualSeriesOptions ;
    // throw new Error("Method not implemented.");
  }


  // toggleSeriesById(id: string, isHide: boolean): boolean {

  //   console.log("toggle: ", id);
  //   let hasSeries = false;
  //   let index = -1;
  //   if (this.mSeriesList) {
  //     this.mSeriesList.forEach((series, i) => {
  //       console.log(series.id);
  //       if (series.id === id) {
  //         hasSeries = true;
  //         index = i;

  //       }

  //     });
  //   }

  //   if (hasSeries) {
  //     if (isHide) {
  //       return this.hideSeriesById(id);
  //     } else {

  //       return this.showSeriesById(id, this.mSeriesList[index]);

  //     }
  //   }

  //   return false;

  // }

  // private showSeriesById(id: string, series: any) {

  //   let chartSeries = this.mChart.get(id);
  //   if (chartSeries) {
  //     return false;
  //   }

  //   this.mChart.addSeries(series);
  //   this.mChart.redraw();
  //   return true;

  // }

  // private hideSeriesById(id: string) {


  //   console.log("hide");
  //   let chartSeries = this.mChart.get(id);
  //   if (chartSeries) {

  //     console.log("hide reomve");
  //     (chartSeries as any).remove();
  //     this.mChart.redraw();
  //     return true;
  //   }

  //   return false;



  // }

  // private convertChartBar(chartjsBar: ChartjsBar){
  //   if(!chartjsBar || !chartjsBar.data || chartjsBar.data.length<=0){
  //     return this.emptyChartBar()

  //   }
  //   let seriesList = [];
  //   for (let i = 0; i < chartjsBar.labels.length; i++) {
  //     let series = []
  //     chartjsBar.data.forEach(element => {
  //       series.push(element[i])
  //     });
  //     let chartHighStockSeries = new ChartHighStockSeries();
  //     chartHighStockSeries.data = series
  //     chartHighStockSeries.name = chartjsBar.labels[i]

  //     seriesList.push(chartHighStockSeries)
  //   }
  //   let chartHighStock = new ChartHighStock(seriesList, this.mColor);
  //   chartHighStock.useTime = false;
  //   this._mIsLoading = false;
  //   this._mChartHighStock = chartHighStock;
  // }
  emptyChartBar() {
    throw new Error("Method not implemented.");
  }



  // updateData(pSeries: any) {
  //   console.log("UpdatingData: ", this.mChart.series);
  //   console.log(pSeries);

  //   if (pSeries) {
  //     let series = this.mChart.series;
  //     if (series && series.length > 0) {
  //       this.mChart.series[0] = pSeries;
  //       return;
  //     } else {
  //       this.mChart.addSeries(pSeries);
  //     }
  //     console.log("UpdateData: ", this.mChart.series);


  //   }

  // }

  _mConfig = {
    chart: {
      type: 'column'
    },
    title: {
      text: ''
    },
    series: [],
    xAxis: {
      min: 0,
      max: 8,
      type: 'category',
      scrollbar: {
        enabled: true
      },
      title: {
        text: ''
      },
      tickLength: 0
    },
    yAxis: {
      min: 0,
      title: {
        text: ''
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      },
      series: {
        stacking: 'normal'
      }
    },
    legend: {
      enabled: false
    }
  };
}
