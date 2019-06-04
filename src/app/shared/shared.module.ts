import { ChartAreaModule } from './charts/chart-area/chart-area.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDaysComponent } from './filters/filter-days/filter-days.component';
import { RouterModule } from '@angular/router';
import { WidgetsModule } from '../widgets/widgets.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChartDoughnutModule } from './charts/chart-doughnut/chart-doughnut.module';
import { ChartStackedbarModule } from './charts/chart-stackedbar/chart-stackedbar.module';
import { ChartPolarModule } from './charts/chart-polar/chart-polar.module';
import { DelayedReportTabComponent } from './delayed-report-tab/delayed-report-tab.component';
import { ChartBarModule } from './charts';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [FilterDaysComponent, DelayedReportTabComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    WidgetsModule,
    FooterModule,
    RouterModule
  ],
  exports: [FilterDaysComponent, DelayedReportTabComponent,
    ChartAreaModule,
    ChartDoughnutModule,
    ChartStackedbarModule,
    ChartPolarModule,
    FooterModule,
    ChartBarModule]
})
export class SharedModule { }
