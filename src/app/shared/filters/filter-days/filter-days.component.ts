import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModelDateRange } from './models';
import { MatSelectChange } from '@angular/material';

export interface ChooseDay {
  value: ModelDateRange;
  viewValue: string;
}
@Component({
  selector: 'app-filter-days',
  templateUrl: './filter-days.component.html',
  styleUrls: ['./filter-days.component.scss']
})
export class FilterDaysComponent implements OnInit {

  @Output('rangeChange') dateRange: EventEmitter<ModelDateRange> = new EventEmitter<ModelDateRange>()
  
  constructor() { }

  ngOnInit() {
  }
  events: string[] = [];
  days: ChooseDay[] = [
    { value: new ModelDateRange('week'), viewValue: 'Last 7 days' },
    { value:new ModelDateRange('month'), viewValue: 'Last month' },
    { value: new ModelDateRange('year'), viewValue: 'Last Year' },
  ];
  public dayDefault = this.days[2].value;

  _onDateChange($event: MatSelectChange){
    if($event.value){
      this.dateRange.emit($event.value as ModelDateRange)
    }
  }

}
