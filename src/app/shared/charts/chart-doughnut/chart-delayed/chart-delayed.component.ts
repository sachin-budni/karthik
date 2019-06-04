import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-delayed',
  templateUrl: './chart-delayed.component.html',
  styleUrls: ['./chart-delayed.component.scss']
})
export class ChartDelayedComponent implements OnInit {

  _mChart: Chart;
  _mDelayedVal: number = 54;
  @ViewChild('canvas') _vCanvas: ElementRef;

  mMaintainCanvasAspectRatio = false;

  private mConfig = {
    type: 'doughnut',
    data: {
      labels: ["# of delayed"],
      datasets: [{
        data: [this._mDelayedVal, 100 - this._mDelayedVal],
        label: 'delayed',
        backgroundColor: [
          '#1FD318',
        ],


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
      segmentShowStroke: false,
      legend: {
        display: false
      },
      tooltips: {
        filter: function (item, data) {
          var label = data.labels[item.index];
          if (label) return item;
        }
      },
      maintainAspectRatio: this.mMaintainCanvasAspectRatio,
      cutoutPercentage: 80,
      scales: {

      }
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
