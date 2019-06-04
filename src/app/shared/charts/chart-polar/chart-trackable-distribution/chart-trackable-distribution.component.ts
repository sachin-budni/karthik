import { Chart } from 'chart.js';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart-trackable-distribution',
  templateUrl: './chart-trackable-distribution.component.html',
  styleUrls: ['./chart-trackable-distribution.component.scss']
})
export class ChartTrackableDistributionComponent implements OnInit {


  _mChart: Chart;
  _mDelayedVal: number = 54;
  @ViewChild('canvas') _vCanvas: ElementRef;


  private mConfig = {
    type: 'polarArea',
    data: {
      labels: ["Trackable", "Bajaj"],
      datasets: [
        {
          label: "Distribution (trackable)",
          backgroundColor: ["#14E66E", "#9e9e9e"],
          data: [6768, 2267],
          fill: false,
          borderWidth: 2
        }
      ]
    },
    options: {
      title: {
        display: false,
      },
      responsive: true,
      segmentShowStroke: false,
      legend: {
        display: false,
      
      },
      tooltips: {
        backgroundColor: '#000',
        titleFontSize: 10,
        titleFontColor: '#0066ff',
        bodyFontColor: '#fff',
        bodyFontSize: 12,
        displayColors: false

      },
      maintainAspectRatio: true,
      scale: {
        display: false
      }
    }
  };
  createChart() {
    let ctx = (<HTMLCanvasElement>this._vCanvas.nativeElement).getContext('2d');



    this._mChart = new Chart(ctx, this.mConfig);
    document.getElementById('legend').innerHTML = this._mChart.generateLegend();

  }
  constructor() { }

  // public chart: any = null;

  ngOnInit() {
    this.createChart();

  }

}
