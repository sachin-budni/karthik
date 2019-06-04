import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProgressBarService, ProgressBarEvent } from 'src/app/core/services/progress-bar.service';

@Component({
  selector: 'app-analysis-container',
  templateUrl: './analysis-container.component.html',
  styleUrls: ['./analysis-container.component.scss']
})
export class AnalysisContainerComponent implements OnInit {

  _mUsername: String = ""
  constructor(private _element: ElementRef, private serviceProgressBar: ProgressBarService,
    private location: Location, private router: Router,
    private serviceAuth: AuthService) {
  }




  ngOnInit() {
    this._mUsername = localStorage.getItem('username')
  }

  logout() {
    console.log("log out ");
    this.serviceAuth.logOut().then((any: any) => {

      this.router.navigate(['auth'])
      console.log("removed: ", any);
    },
      (resone: any) => {
        console.log("rejected: ", resone);

      }
    );

  }

}
