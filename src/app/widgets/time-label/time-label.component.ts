import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget-time-label',
  templateUrl: './time-label.component.html',
  styleUrls: ['./time-label.component.scss']
})
export class TimeLabelComponent implements OnInit {

  _mIsAM = false

  @Input() set isAM(val: boolean){
    if(val){
      this._mIsAM = val;
    }else{
      this._mIsAM = false;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
