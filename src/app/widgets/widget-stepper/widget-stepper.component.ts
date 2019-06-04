import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget-stepper',
  templateUrl: './widget-stepper.component.html',
  styleUrls: ['./widget-stepper.component.scss']
})
export class WidgetStepperComponent {

  _mStatusBackground: string;
  _mSpeedStatus: string;
  @Input() set statusBackground(value: string) {
    this._mStatusBackground = value;
  }

  @Input() set speedStatus(value: string) {
    this._mSpeedStatus = value;
  }


  @Input("isLast") set isLast(value: boolean) {
    console.log(value);
    this.toggleLine(value);
  }


  _qIndicator: any;

  @Input('qIndicator') set qIndicator(indicator) {
    console.log('Indicator is: ', indicator);
    this._qIndicator = indicator;
    this.toggleLine(this._qIndicator.isLast);
  }
  _mClassLineDisplay: string = "";
  _mIndicatorHidden: boolean = true;
  marksObtained: string;


  toggleLine(isHiddenLine: boolean) {
    if (isHiddenLine) {
      console.log("true part: ", isHiddenLine);
      this._mClassLineDisplay = "tb-display--none";
      this._mIndicatorHidden = false;
    } else {
      this._mClassLineDisplay = "";
      this._mIndicatorHidden = false;
    }
  }

}