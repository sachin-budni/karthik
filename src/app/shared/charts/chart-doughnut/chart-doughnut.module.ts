import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDelayedComponent } from './chart-delayed/chart-delayed.component';
import { ChartConsentAllowedComponent } from './chart-consent-allowed/chart-consent-allowed.component';
import { TripChartDoughnutComponent } from './trip-chart-doughnut/chart-doughnut.component';
import { ChatDoughnutComponent } from './chat-doughnut/chat-doughnut.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TripChartDoughnutComponent, ChartDelayedComponent, ChartConsentAllowedComponent, ChatDoughnutComponent],
  exports: [TripChartDoughnutComponent, ChartDelayedComponent, ChartConsentAllowedComponent, ChatDoughnutComponent]
})
export class ChartDoughnutModule { }
