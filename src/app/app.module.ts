import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContainerModule } from './container/container.module';
import { AppRoutingModule } from './route.module';
import { MatFormFieldModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { ApiUrls } from './service/api-urls';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
		MaterialModule,
		FlexLayoutModule,
		ContainerModule,
		AppRoutingModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [ApiUrls],
  bootstrap: [AppComponent]
})
export class AppModule { }
