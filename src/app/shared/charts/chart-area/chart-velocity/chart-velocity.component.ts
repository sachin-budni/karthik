import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';

Chart.defaults.global.defaultFontColor = 'grey';
@Component({
  selector: 'app-chart-velocity',
  templateUrl: './chart-velocity.component.html',
  styleUrls: ['./chart-velocity.component.scss']
})
export class ChartVelocityComponent implements OnInit {

  _mChart: Chart;

  @ViewChild('canvas') _vCanvas: ElementRef;

 
  mMaintainCanvasAspectRatio = false;
  dataSets1: String[] = ['3', '2', '6', '5', '2', '6']
  dataSets2: String[] = ['6', '7', '2', '6', '6', '3']
  dataSets3: String[] = ['8', '2', '6', '5', '2', '6']

  destination: String[] = ["Haryana", "Delhi", "Kota", "Ajmer", "Hisaar", "Jammu"];

  mConfig = {
    type: 'line',
    data: {
      labels: this.destination,
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
