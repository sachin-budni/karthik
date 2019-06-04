import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartBarHighstockComponent } from './chart-bar-highstock/chart-bar-highstock.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChartBarComponent, ChartBarHighstockComponent],
  exports:[ChartBarComponent, ChartBarHighstockComponent]
})
export class ChartBarModule { }
