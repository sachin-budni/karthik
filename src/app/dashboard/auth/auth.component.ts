import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ProgressBarService, ProgressBarEvent } from 'src/app/core/services/progress-bar.service';
import { ApiAuthService } from 'src/app/service/api/api-auth.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ResponseLogin } from 'src/app/service/api/params/response-auth';
import { ModelToken } from 'src/app/core/auth/models';

@Component({
  selector: 'auth-root',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  _mInProgress = false

  constructor(private serviceProgressBar: ProgressBarService) {
  }

  ngOnInit() {
    this.serviceProgressBar.updateProgressBar$.subscribe((event: ProgressBarEvent) => {
      console.log("progress: ", event);
      if (event.id == ProgressBarService.IDS.AUTH) {
        console.log("progress: ", event);
        if (event.mode == ProgressBarService.MODES.indeterminate) {
          this._mInProgress = true;
        } else {
          this._mInProgress = false;
        }
      }
    });
  }


  
}
