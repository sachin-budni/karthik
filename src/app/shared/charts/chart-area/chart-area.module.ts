import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartAreaComponent } from './chart-area/chart-area.component';
import { ChartVelocityComponent } from './chart-velocity/chart-velocity.component';

@NgModule({
  declarations: [ChartAreaComponent, ChartVelocityComponent],
  imports: [
    CommonModule
  ], exports: [ChartAreaComponent,ChartVelocityComponent]
})
export class ChartAreaModule { }
