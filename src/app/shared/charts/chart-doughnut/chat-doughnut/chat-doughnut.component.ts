import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartjsDoughunt, ChartjsDoughuntData } from '../../models';

@Component({
  selector: 'app-chart-doughnut',
  templateUrl: './chat-doughnut.component.html',
  styleUrls: ['./chat-doughnut.component.scss'],
  host: { class: "tb-position--relative" }
})
export class ChatDoughnutComponent implements OnInit {

  mIsLabelHidden: boolean = false;
  mIsDataSet: boolean;
  _mChart: Chart;
  mChartjsDoughunt: ChartjsDoughunt;
  mMaintainCanvasAspectRatio = false;
  mIsInitialized: boolean = false;

  @ViewChild('canvas') _vCanvas: ElementRef;



  @Input() set isLabelHidden(value: boolean) {
    if (value && value === true) {
      this.mIsLabelHidden = true;

    }
    this.updateConfig();

    // console.log("isLabelhIdden", value );
  }

  @Input() set model(value: ChartjsDoughunt) {
    if (value) {
      this.mChartjsDoughunt = value;
    }

    console.log("chart set", this.mChartjsDoughunt);

    if (this.mIsInitialized) {
      this.updateChartData(this.mChartjsDoughunt)
    } else {
      this.mIsDataSet = true;
    }
  }
  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      this.createChart();
      // console.log("chart created");
      if (this.mIsDataSet && this.mChartjsDoughunt) {
        this.updateChartData(this.mChartjsDoughunt);
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
    if (!(this.mConfig)) {
      return;
    }
    this.mConfig.options.legend.display = !this.mIsLabelHidden;

    if (this._mChart) {
      this._mChart.update();
    }

  }

  updateChartData(chartjsDoughunt: ChartjsDoughunt) {
    // console.log("updateChartData:", chartData);
    // console.log("updatelabels:", labels);
    console.log("chart updat");

    let datasets = this.mConfig.data.datasets;
    let isUpdate = false;
    let index = -1;
    console.log(chartjsDoughunt);
    if (datasets.length > 0) {
      datasets[0].data = chartjsDoughunt.data.data;
      datasets[0].backgroundColor = chartjsDoughunt.data.backgroundColor;
      datasets[0].borderWidth = 2;
    } else {
      let data = new ChartjsDoughuntData()
      data.data = chartjsDoughunt.data.data
      data.backgroundColor = chartjsDoughunt.data.backgroundColor
      data.borderWidth = 2
      datasets.push(data);
    }


    // if (chartLabel)
    this.mConfig.data.labels = chartjsDoughunt.labels;

    console.log(this.mConfig);
    this._mChart.update();


  }
  /* ********************************************************************
  *                                Charts
  */

  mConfig = {
    type: 'doughnut',
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
      cutoutPercentage: 80,
      maintainAspectRatio: this.mMaintainCanvasAspectRatio,
      stacked: false,
      hoverMode: 'index',
      legend: {
        display: !this.mIsLabelHidden,
        position: "bottom"

      }

      // tooltips: {
      // 	mode: 'index',
      // 	intersect: false,
      // }
    }
  };

}
