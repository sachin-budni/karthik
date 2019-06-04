import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ChartjsPolar } from '../../models';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-polar',
  templateUrl: './chart-polor.component.html',
  styleUrls: ['./chart-polor.component.scss']
})
export class ChartPolorComponent implements OnInit {

  mIsLabelHidden: boolean= false;
  mIsDataSet: boolean;
  _mChart: Chart;
  mChartjsPolar: ChartjsPolar;
  mMaintainCanvasAspectRatio = false;
  mIsInitialized: boolean = false;

  @ViewChild('canvas') _vCanvas: ElementRef;
  
  

  @Input() set isLabelHidden(value: boolean){
    if(value && value=== true){
      this.mIsLabelHidden = true;

    }
    this.updateConfig();

    // console.log("isLabelhIdden", value );
  }

  @Input() set model(value: ChartjsPolar) {
    if (value) {
      this.mChartjsPolar = value;
    }

    // console.log("chart set", this.mChartPie);

    if (this.mIsInitialized) {
      this.updateChartData(this.mChartjsPolar)
    } else {
      this.mIsDataSet = true;
    }
  }
  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      this.createChart();
      // console.log("chart created");
      if (this.mIsDataSet && this.mChartjsPolar) {
        this.updateChartData(this.mChartjsPolar);
      }
      this.mIsInitialized = true;
    });
  }

  createChart() {
    let ctx = (<HTMLCanvasElement>this._vCanvas.nativeElement).getContext('2d');
    // console.log(ctx);
    //ctx.canvas.height = 500;

    // let label = this.mLabel;

    this._mChart = new Chart(ctx,
      this.mConfig);

  }

  updateConfig(): any {
    if(!(this.mConfig)){
      return;
    }
    this.mConfig.options.legend.display = !this.mIsLabelHidden;

    if(this._mChart){
      this._mChart.update();
    }
   
  }

  updateChartData(chartjsPolar: ChartjsPolar) {
    // console.log("updateChartData:", chartData);
    // console.log("updatelabels:", labels);
    // console.log("chart updat");

    let datasets = this.mConfig.data.datasets;
    let isUpdate = false;
    let index = -1;
    // console.log(chartjsPie);
    if (datasets.length > 0) {
      datasets[0].data = chartjsPolar.data.data;
      datasets[0].backgroundColor = chartjsPolar.data.backgroundColor;
      datasets[0].borderWidth = 2;
      datasets[0].fill = false
    } else {
      datasets.push(chartjsPolar.data);
    }


    // if (chartLabel)
    this.mConfig.data.labels = chartjsPolar.labels;

    console.log(this.mConfig);
    this._mChart.update();


  }
   /* ********************************************************************
   *                                Charts
   */

  mConfig = {
    type: 'polarArea',
    data: {
      labels: [],
      datasets: []
    },
    // tooltips: {
    // 	mode: 'index',
    // 	intersect: false,
    // },
    // hover: {
    // 	mode: 'nearest',
    // 	intersect: true
    // },
    options: {
      responsive: true,
      segmentShowStroke: false,
      maintainAspectRatio: this.mMaintainCanvasAspectRatio,
      stacked: false,
      hoverMode: 'index',
      legend:{
        display: !this.mIsLabelHidden,
        position: "bottom"

      },
      scale: {
        display: false
      }

      // tooltips: {
      // 	mode: 'index',
      // 	intersect: false,
      // }
    }
  };


}
