import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetTripStatusColorComponent } from './widget-trip-status-color/widget-trip-status-color.component';
import { WidgetSpeedStatusComponent } from './widget-speed-status/widget-speed-status.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WidgetStepperComponent } from './widget-stepper/widget-stepper.component';
import { TimeLabelComponent } from './time-label/time-label.component';
import { WidgetTimelineBlockItemComponent } from './widget-timeline-block-item/widget-timeline-block-item.component';
import { WidgetDeviceIndicatorItemComponent } from './widget-device-indicator-item/widget-device-indicator-item.component';
import { WidgetLegendItemComponent } from './widget-legend-item/widget-legend-item.component';

@NgModule({
  declarations: [WidgetTripStatusColorComponent,
    WidgetSpeedStatusComponent,
    WidgetStepperComponent,
    TimeLabelComponent,
    WidgetTimelineBlockItemComponent,
    WidgetDeviceIndicatorItemComponent,
    WidgetLegendItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [TimeLabelComponent,
    WidgetTripStatusColorComponent,
    WidgetSpeedStatusComponent,
    WidgetStepperComponent,
    WidgetTimelineBlockItemComponent,
    WidgetDeviceIndicatorItemComponent,
    WidgetLegendItemComponent]
})
export class WidgetsModule { }
