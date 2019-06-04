import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

import { Chart } from 'chart.js';
import { ChartjsBar } from '../../models';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss'],
  host: { class: "tb-position--relative" }
})
export class ChartBarComponent implements OnInit {

  mIsLabelHidden: boolean = false;
  mIsDataSet: boolean;
  _mChart: Chart;
  mChartBar: ChartjsBar;
  mMaintainCanvasAspectRatio = false;
  mIsInitialized: boolean = false;

  @ViewChild('canvas') _vCanvas: ElementRef;

  

  @Input() set isLabelHidden(value: boolean) {
    if (value && value === true) {
      this.mIsLabelHidden = true;
    }
    this.updateConfig();

    //console.log("isLabelhIdden", value);
  }
  @Input() set model(value: ChartjsBar) {
    if (value) {
      this.mChartBar = value;
    }

    //console.log("chart set", this.mChartBar);

    if (this.mIsInitialized) {
      this.updateChartData(this.mChartBar)
    } else {
      this.mIsDataSet = true;
    }
  }

  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      this.createChart();
      //console.log("chart created");
      if (this.mIsDataSet && this.mChartBar) {
        this.updateChartData(this.mChartBar);
      }
      this.mIsInitialized = true;
    });
  }

  /* ********************************************************************
   *                                Charts
   */

  mConfig = {
    type: 'bar',
    data: {
      fontColor:'#757575',
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
      maintainAspectRatio: this.mMaintainCanvasAspectRatio,
      stacked: false,
      hoverMode: 'index',
      legend: {
        display: !this.mIsLabelHidden
        // ,
        // position: "bottom"

      },
      elements: {
        point: {
          radius: 25,
          hoverRadius: 35,
          pointStyle: 'rectRounded',

        }
      },
      cornerRadius: 24,
      fullCornerRadius: false,
      barRoundness: 1,
     
      scales: {
        xAxes: [{
          gridLines: {
            display: true,
            zeroLineColor: '#ffffff',
            color: '#ffffff',
          },
          ticks: {
            fontSize: 10,
            fontColor: "#252525"
           },
          stacked: true,
          
          categoryPercentage: 0.2,


        }],
        yAxes: [{
          display: true,
          stacked: true,
          gridLines: {
            drawBorder: false,
            display: true,
            color: "#FFFFFF"
          },
         
        }],
        
      }

      // tooltips: {
      // 	mode: 'index',
      // 	intersect: false,
      // }
    }
  };

  createChart() {
    let ctx = (<HTMLCanvasElement>this._vCanvas.nativeElement).getContext('2d');
    // console.log(ctx);
    //ctx.canvas.height = 500;

    // let label = this.mLabel;

    this._mChart = new Chart(ctx,
      this.mConfig);

  }

  updateConfig(): any {
    if (!(this.mConfig)) {
      return;
    }
    this.mConfig.options.legend.display = !this.mIsLabelHidden;

    if (this._mChart) {
      this._mChart.update();
    }

  }

  updateChartData(chartjsBar: ChartjsBar) {
    // console.log("updateChartData:", chartData);
    // console.log("updatelabels:", labels);
    //console.log("chartbar update");

    let datasets = this.mConfig.data.datasets;
    let isUpdate = false;
    let index = -1;
    //console.log(ChartjsBar);
    // if (datasets.length > 0) {
    //   datasets[0].data = chartjsPie.data.data;
    //   datasets[0].backgroundColor = chartjsPie.data.backgroundColor;
    // } else {
    // datasets = ChartjsBar.data;
    // }


    // if (chartLabel)
    this.mConfig.data.datasets = chartjsBar.data;
    this.mConfig.data.labels = chartjsBar.labels;
    if(chartjsBar.fontColor){
      this.mConfig.data.fontColor = chartjsBar.fontColor;
      
    }

    //console.log("chartbar: ", this.mConfig);
    this._mChart.update();


  }

}
