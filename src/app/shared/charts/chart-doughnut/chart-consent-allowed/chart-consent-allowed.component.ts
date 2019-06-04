import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-consent-allowed',
  templateUrl: './chart-consent-allowed.component.html',
  styleUrls: ['./chart-consent-allowed.component.scss']
})
export class ChartConsentAllowedComponent implements OnInit {

  _mChart: Chart;
  _mProgressVal: number = 54;
  @ViewChild('canvas') _vCanvas: ElementRef;

  mMaintainCanvasAspectRatio = false;

  private mConfig = {
    type: 'doughnut',
    data: {
      labels: ["Trackable", "Consent Allowed"],
      datasets: [{
        label: "Consent Allowed",
        backgroundColor: ["#3e95cd", "#90E9B1"],
        data: [34, 66]
      }]
    },
    options: {
      elements: {
        arc: {
          roundedCornersFor: 0
        },
        // 
      },
      responsive: true,
     
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: '#333',
          fontSize: 16,
          boxWidth: 22,
        },
      },
      tooltips: {

        backgroundColor: '#000',
        titleFontSize: 10,
        titleFontColor: '#0066ff',
        bodyFontColor: '#fff',
        bodyFontSize: 16,
        displayColors: false

      },
      maintainAspectRatio: this.mMaintainCanvasAspectRatio,
      cutoutPercentage: 82,
     
    }
  };
  createChart() {
    let ctx = (<HTMLCanvasElement>this._vCanvas.nativeElement).getContext('2d');
    // round corners
    Chart.pluginService.register({
      afterUpdate: function (chart) {
        if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
          var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
          arc.round = {
            x: (chart.chartArea.left + chart.chartArea.right) / 2,
            y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
            radius: (chart.outerRadius + chart.innerRadius) / 2,
            thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
            backgroundColor: arc._model.backgroundColor
          }
        }
      },

      afterDraw: function (chart) {
        if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
          var ctx = chart.chart.ctx;
          var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
          var startAngle = Math.PI / 2 - arc._view.startAngle;
          var endAngle = Math.PI / 2 - arc._view.endAngle;

          ctx.save();
          ctx.translate(arc.round.x, arc.round.y);
          console.log(arc.round.startAngle)
          ctx.fillStyle = arc.round.backgroundColor;
          ctx.beginPath();
          ctx.arc(arc.round.radius * Math.sin(startAngle), arc.round.radius * Math.cos(startAngle), arc.round.thickness, 0, 2 * Math.PI);
          ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      },
    });



    this._mChart = new Chart(ctx, this.mConfig);

  }
  constructor() { }

  // public chart: any = null;

  ngOnInit() {
    // this.chart = new Chart("canvas-velocity", this.mConfig);
    this.createChart();

  }

}
