import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { ApiAuthService } from 'src/app/service/api/api-auth.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ResponseLogin } from 'src/app/service/api/params/response-auth';
import { ModelToken } from 'src/app/core/auth/models';



@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  _mInProgress = false;
  _mFormGroup: FormGroup;
  _mReturnUrl: any;
  
  constructor(

    private route: ActivatedRoute,
    private formBuilder: FormBuilder, public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private serviceProgressBar: ProgressBarService,
    private serviceApiAuth: ApiAuthService,
    private serviceAuth: AuthService) {

    this._mReturnUrl = this.route.snapshot.queryParams['returnUrl'] || '/analysis';

    this._mFormGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    }
    );

  }

  onSubmit() {
    this.signInPassword()
  }
  
  signInPassword() {
    // if (this.afAuth.auth.currentUser != null) {
    //   console.log("i", this.afAuth.auth.currentUser);
    // } else {
    if (this._mInProgress) return;

    this._mInProgress = true
    this.serviceProgressBar.increase(ProgressBarService.IDS.AUTH);
    this.serviceApiAuth.login(this._mFormGroup.value['username'], this._mFormGroup.value['password']).
    subscribe(result =>{
      this.saveAccessToken(result)

    },
    err => {
        
      this.closeProgress()
      this.snackBar.open("Unable To login",null, {
          duration: 2000,
        });
        console.log("error: ", err);
      })
    // this.afAuth.auth.signInWithEmailAndPassword(this._mFormGroup.value['email'], this._mFormGroup.value['password']).then(result => {
    //   console.log("signup", result);
    //   this.verify()
    // }, error => {
    //   console.log("error", error);
    //   this.serviceProgressBar.decrease(ProgressBarService.IDS.AUTH);
    //   this._mInProgress = false

    // });
    //}
  }

  saveAccessToken(res: ResponseLogin) {
    this.serviceAuth.saveAccessToken(res.token).subscribe((isSuccess: ModelToken) => {
      this.router.navigate([this._mReturnUrl]);
  
      this.closeProgress()
          //console.log("response: ", res);
    },
      err => {
        
      this.closeProgress()
      this.snackBar.open("Unable To login",null, {
          duration: 2000,
        });
        console.log("error: ", err);
      });
  }

  closeProgress() {
    this.serviceProgressBar.decrease(ProgressBarService.IDS.AUTH);
      this._mInProgress = false
      
  }




  ngOnInit() {



  }
  




}
