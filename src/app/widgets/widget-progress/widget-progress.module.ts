import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetProgressComponent } from './widget-progress/widget-progress.component';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  declarations: [WidgetProgressComponent],
  exports:[WidgetProgressComponent]
})
export class WidgetProgressModule { }
