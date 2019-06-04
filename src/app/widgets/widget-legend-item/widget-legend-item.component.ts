import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget-legend-item',
  templateUrl: './widget-legend-item.component.html',
  styleUrls: ['./widget-legend-item.component.scss']
})
export class WidgetLegendItemComponent implements OnInit {

  _mClassBackground: string;
  _mLegendField: string;

  @Input("backgroundClass") set backgroundClass(value: string) {
    console.log(value);
    this._mClassBackground = value;
  }


  @Input("legendField") set legendField(value: string) {
    this._mLegendField = value;
  }
  constructor() { }

  ngOnInit() {
  }

}
