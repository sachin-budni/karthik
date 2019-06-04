import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/service';
import { map } from 'rxjs/operators';
import { ResponseTrip } from 'src/app/service/api/params';
import { ModelMapTop3 } from './models';

@Component({
  selector: 'app-heat-map-detail',
  templateUrl: './heat-map-detail.component.html',
  styleUrls: ['./heat-map-detail.component.scss']
})
export class HeatMapDetailComponent implements OnInit {



  mSubscription: Subscription
  _mIsLoading = false;

  _mOverviewSource: ModelMapTop3 = new ModelMapTop3('srcname');
  _mOverviewDest: ModelMapTop3 = new ModelMapTop3('destname');
  mRawValues: ResponseTrip[];

  @Input('value') set onValue(val: ResponseTrip[]) {
    this.mRawValues = val
    this.calcAll(val)

  }

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {

    setTimeout(() => {

      //this.subscribeData()
    })
  }

  calcAll(val) {

    this.calcSource(val)
    this.calcDest(val)

  }

  // subscribeData() {

  //   this._mIsLoading = true;
  //   this.mSubscription = this.sharedDataService.getAnalysisEmitter(false)
  //     .pipe(
  //       map((val: ResponseTrip[]) => {
  //         //console.log("vaL2: ", val)
  //         let series = []

  //         this.calcSource(val)
  //         this.calcDest(val)

  //         return val
  //       })
  //     ).subscribe((val: ResponseTrip[]) => {

  //     })
  // }

  calcDest(val: ResponseTrip[]): any {
    this._mOverviewDest.setTrips(val)
    console.log("overview dest: ", this._mOverviewDest);
  }

  calcSource(val: ResponseTrip[]): any {
    this._mOverviewSource.setTrips(val)
    //console.log("overview delay: ", overview);
    console.log("overview source: ", this._mOverviewSource);
  }

}
