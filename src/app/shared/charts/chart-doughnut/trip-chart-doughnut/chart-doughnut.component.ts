import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'trip-chart-doughnut',
  templateUrl: './chart-doughnut.component.html',
  styleUrls: ['./chart-doughnut.component.scss']
})
export class TripChartDoughnutComponent implements OnInit {

  mMaintainCanvasAspectRatio = false;

  private mConfig ={
    type: 'doughnut',
    data: {
      labels: ["Reached", "On time", "Delayed"],
      datasets: [{
        label: 'Trips',
        data: [12, 19, 15],
        backgroundColor: [
          '#35CEA5',
          '#2F78E8',
          '#FB365D',
        ],
        borderColor: [
          '#35CEA5',
          '#2F78E8',
          '#FB365D',
        ],
        borderWidth: 2,

      }]
    },
    options: {
      legend: {
        display: false
      },
      
      responsive: true,
      maintainAspectRatio: this.mMaintainCanvasAspectRatio,
      cutoutPercentage: 80,
      scales: {

      }
    }
  };

  
  _mChart: Chart;

  @ViewChild('canvas') _vCanvas: ElementRef;


  constructor() { }


  ngOnInit() {

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
