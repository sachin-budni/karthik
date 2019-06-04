import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'device-chart-area',
  templateUrl: './chart-area.component.html',
  styleUrls: ['./chart-area.component.scss']
})
export class ChartAreaComponent implements OnInit {


_mChart: Chart;

  @ViewChild('canvas') _vCanvas: ElementRef;

 
  mMaintainCanvasAspectRatio = false;
  dataSets1: String[] = ['3', '2', '6', '5', '2', '6']
  dataSets2: String[] = ['6', '7', '2', '6', '6', '3']
  dataSets3: String[] = ['8', '2', '6', '5', '2', '6']

  time: String[] = ["5:45", "6:40", "8:44", "10:22", "12:02", "04:34"];

  mConfig = {
    type: 'line',
    data: {
      labels: this.time,
      fontColor: '#35CEA5',
      datasets: [
        {
          borderColor:'rgba(31,76,157,1)',
          backgroundColor:undefined,
          data: this.dataSets1,
         
        },
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },

      scales: {
        xAxes: [{
          gridLines: { display: false },
          barPercentage: 0.3
        }],
        yAxes: [{
          stacked: true
        }],


      }
    }
  };

 createChart() {
    let ctx = (<HTMLCanvasElement>this._vCanvas.nativeElement).getContext('2d');
    console.log("h",this._vCanvas.nativeElement.offsetHeight);
    
    var gradient= ctx.createLinearGradient(0,0,0,this._vCanvas.nativeElement.offsetHeight);
    gradient.addColorStop(0, 'rgba(51,61,132,1)');   
    gradient.addColorStop(1, 'rgba(51,61,132,0)');
    this.mConfig.data.datasets[0].backgroundColor = gradient
    this._mChart = new Chart(ctx, this.mConfig);
    
  }

  constructor() { }

  // public chart: any = null;

  ngOnInit() {
    // this.chart = new Chart("canvas-velocity", this.mConfig);
    this.createChart();


  }

}
