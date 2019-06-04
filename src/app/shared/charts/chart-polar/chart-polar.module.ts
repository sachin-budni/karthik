import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartTrackableDistributionComponent } from './chart-trackable-distribution/chart-trackable-distribution.component';
import { ChartPolorComponent } from './chart-polor/chart-polor.component';

@NgModule({
  declarations: [ChartTrackableDistributionComponent, ChartPolorComponent],
  imports: [
    CommonModule
  ],
  exports:[ChartTrackableDistributionComponent, ChartPolorComponent]
})
export class ChartPolarModule { }
