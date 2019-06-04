import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login';

export const routes: ModuleWithProviders = RouterModule.forChild(

  [
    {
      path: '',
      redirectTo: 'login'
    },
    {
      path: '',
      component: AuthComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent
        },

      ]
    },



  ]);
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSnackBarModule,
    routes
  ],
  declarations: [LoginComponent, AuthComponent],
  entryComponents: []
})
export class AuthModule { }
