import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartStackedbarComponent } from './chart-stackedbar/chart-stackedbar.component';
import { ChartDelayedReportComponent } from './chart-delayed-report/chart-delayed-report.component';

@NgModule({
  declarations: [ChartStackedbarComponent, ChartDelayedReportComponent],
  imports: [
    CommonModule
  ],
  exports:[ChartStackedbarComponent,ChartDelayedReportComponent]
})
export class ChartStackedbarModule { }
