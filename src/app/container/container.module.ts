import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankContainerComponent } from './blank-container/blank-container.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AnalysisContainerComponent } from './analysis-container/analysis-container.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    MatButtonToggleModule
  ],
  declarations: [
    BlankContainerComponent,
    DashboardContainerComponent,
    AnalysisContainerComponent,
  ],
  exports: [
    BlankContainerComponent,
    DashboardContainerComponent,
    AnalysisContainerComponent]
})
export class ContainerModule { }
