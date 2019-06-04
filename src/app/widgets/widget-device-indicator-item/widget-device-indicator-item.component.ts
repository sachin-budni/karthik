import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget-device-indicator-item',
  templateUrl: './widget-device-indicator-item.component.html',
  styleUrls: ['./widget-device-indicator-item.component.scss']
})
export class WidgetDeviceIndicatorItemComponent implements OnInit {

  _mColorBackgroundClass: string;
 

  @Input("backgroundClass") set indicatorColor(value: string) {
    console.log(value);
    this._mColorBackgroundClass = value;
  }
  constructor() { }

  ngOnInit() {
  }

}
