import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget-progress',
  templateUrl: './widget-progress.component.html',
  styleUrls: ['./widget-progress.component.scss'],
  host:{class:"app-progress--rounded widget-progress"}
})
export class WidgetProgressComponent implements OnInit {

  _mProgress = 0;
  @Input() set progress(value: number) {
    if (value !== null || value != undefined)
      this._mProgress = value;

    // this.updateClass();
  }


  mIsNegative = false;
  @Input() set isNegative(value: boolean) {
    console.log(value)
    if (value)
      this.mIsNegative = value;
    else
      this.mIsNegative = false;

  }

  _mClass = "widget-progress-primary";

  @Input() set progressClass(val: string){
    if(val){
      this._mClass = val
    }else{
      this._mClass = "widget-progress-primary"
    }
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateClass();

    });
  }




  updateClass(): any {
    // is
    console.log(this.mIsNegative)
    // if (this._mProgress < 25) {
    //   this._mClass = (this.mIsNegative === true) ? "widget-progress-green": "widget-progress-red" ;
    // } else if (this._mProgress >= 25 && this._mProgress < 50) {
    //   this._mClass =( this.mIsNegative=== true)  ?  "widget-progress-amber": "widget-progress-orange" ;
    // } else if (this._mProgress >= 50 && this._mProgress < 75) {
    //   this._mClass =( this.mIsNegative === true) ? "widget-progress-orange":  "widget-progress-amber" ;
    // } else if (this._mProgress >= 75 && this._mProgress <= 100) {
    //   this._mClass = this.mIsNegative  ?  "widget-progress-red": "widget-progress-green";
    // }
  }

}
