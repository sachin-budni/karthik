import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent, MapComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDQusYV6LpYSckprBTndEZ8OiHHwR2Zd10'
    }),
  ],
  exports:[FooterComponent,MapComponent]
})
export class FooterModule { }
