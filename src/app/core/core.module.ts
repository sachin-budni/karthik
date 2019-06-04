import { NgModule, SkipSelf, Optional, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressInterceptor } from './interceptors/progress.interceptor';
import { ProgressBarService } from './services/progress-bar.service';
import { TimingInterceptor } from './interceptors/timing.interceptor';
import { IndexeddbService } from './db/indexeddb.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { InterceptorAuthService } from './auth/interceptor-auth.service';

export function initialize_Db(indexeddbService: IndexeddbService) {
  return () => indexeddbService.initializeDb();
}
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,

  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true, deps: [ProgressBarService]},
    { provide: APP_INITIALIZER, useFactory: initialize_Db, deps: [IndexeddbService], multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorAuthService,
      multi: true

    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
 }
