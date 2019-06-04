
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardContainerComponent } from './container/dashboard-container/dashboard-container.component';
import { BlankContainerComponent } from './container/blank-container/blank-container.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { AnalysisContainerComponent } from './container/analysis-container/analysis-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'analysis',
    pathMatch: 'full'

  },
 {
    path: '',
    component: BlankContainerComponent,

    children: [
      {
        path: "auth",
        loadChildren: "./dashboard/auth/auth.module#AuthModule"
      }
    ]

  },
  {
    path: '',
    component: DashboardContainerComponent,

    canActivate: [AuthGuardService],
    children: [
     
    ]

  }  ,
 
  
  
  {
    path: 'analysis',
    component: AnalysisContainerComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        loadChildren: './dashboard/analysis/analysis.module#AnalysisModule'
      }
    ]

  },
 
 
  {
    path: 'test',

    loadChildren: './test/test.module#TestModule'

  },




];

const rootRouting: ModuleWithProviders = RouterModule.forRoot(routes,

  { preloadingStrategy: PreloadAllModules, useHash: false, enableTracing: false });


@NgModule({
  imports: [rootRouting],
  exports: [RouterModule]
})
export class AppRoutingModule { }

