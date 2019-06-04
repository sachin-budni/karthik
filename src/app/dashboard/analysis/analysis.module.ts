import { WidgetProgressModule } from './../../widgets/widget-progress/widget-progress.module';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AnalysisComponent } from './analysis.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material';
import { OverviewComponent } from './overview/overview.component';
import { SummaryComponent } from './summary/summary.component';
import { DelayedReportComponent } from './delayed-report/delayed-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TbSelectModule } from 'src/app/tb';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { HeatMapDetailComponent } from './heat-map/heat-map-detail/heat-map-detail.component';
import { DialogProgressModule } from 'src/app/shared/dialogs/progress';
import { SummeryTrackedComponent } from './summary/summery-tracked/summery-tracked.component';
import { SummeryTrackableComponent } from './summary/summery-trackable/summery-trackable.component';
import { FormsModule } from '@angular/forms';

export const routes: ModuleWithProviders = RouterModule.forChild([

  {
    path: '',
    component: AnalysisComponent
  },



]);
@NgModule({
  declarations: [AnalysisComponent, OverviewComponent, SummaryComponent, DelayedReportComponent, HeatMapComponent, HeatMapDetailComponent, SummeryTrackedComponent, SummeryTrackableComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    MatFormFieldModule,
    MatDatepickerModule,
    SharedModule,
    WidgetsModule,
    TbSelectModule,
    WidgetProgressModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDQusYV6LpYSckprBTndEZ8OiHHwR2Zd10'+ '&libraries=visualization'
    }),
    AgmJsMarkerClustererModule,
    DialogProgressModule,
    routes,
    FormsModule
  ],

})


export class AnalysisModule { }
