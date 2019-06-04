import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test1Component } from './test1/test1.component';
import { RouterModule } from '@angular/router';
import { TbTimelineDottedModule } from '../tb';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterModule } from '../shared/footer/footer.module';
export const routes: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: Test1Component,
    pathMatch: 'full'
  },
 

]);
@NgModule({
  declarations: [Test1Component],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TbTimelineDottedModule,
    FooterModule,
    routes
  ]
})
export class TestModule { }
