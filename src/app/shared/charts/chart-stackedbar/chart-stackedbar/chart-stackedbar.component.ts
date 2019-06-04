import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

Chart.defaults.global.defaultFontColor = '#A3A3A4';
@Component({
  selector: 'trip-chart-stackedbar',
  templateUrl: './chart-stackedbar.component.html',
  styleUrls: ['./chart-stackedbar.component.scss']
})
export class ChartStackedbarComponent implements OnInit {


  mMaintainCanvasAspectRatio = false;
  dataSets1: String[] =['3','2','6','5','2','6','2','6','5']
  dataSets2: String[] =['6','7','2','6','6','3','2','6','5']
  dataSets3: String[] =['8','2','6','5','2','6','4','6','2']

  destination:String[]=["Haryana", "Delhi", "Kota", "Ajmer", "Hisaar", "Jammu","Tata", "Ranchi", "Dhanbad"];

  private mConfig = {
    type: 'bar',
    data: {
      labels: this.destination,
      fontColor: '#35CEA5',
      datasets: [
        {
        label: 'On Time',
        data: this.dataSets1,
        backgroundColor: '#35CEA5',
      }, {
        label: 'Delayed',
        data: this.dataSets2,
        backgroundColor: '#FB365D',
      },
      {
        label: 'Reached',
        data: this.dataSets3,
        backgroundColor: '#2F78E8',
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
          stacked: true, 
          gridLines: { display: false },
          barPercentage: 0.3
          }],
        yAxes: [{ 
          stacked: true, 
          }],
          
        
      }
    }
  };

  _mChart: Chart;

  @ViewChild('canvas') _vCanvas: ElementRef;
  constructor() { }

  public chart: any = null;

  ngOnInit() {
    // this.chart = new Chart("canvas-stacked", this.pieChartConfig);


    setTimeout(()=>{
      this.createChart();
    });


  }

  createChart() {
    let ctx = (<HTMLCanvasElement>this._vCanvas.nativeElement).getContext('2d');
    // this.mConfig.data.datasets[0].backgroundColor = gradient
    this._mChart = new Chart(ctx, this.mConfig);
    
  }
}
