import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delayed-report-tab',
  templateUrl: './delayed-report-tab.component.html',
  styleUrls: ['./delayed-report-tab.component.scss']
})
export class DelayedReportTabComponent implements OnInit {

 
  
  _mActiveLane: boolean = true;
  _mActiveClient: boolean = false;
  _mActiveTransporter: boolean = false;
  // _mActiveSocialClient: boolean = false;

  @Output()
  onTabSelect: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

  

  }
 


  onClicked(name: string) {
    this.clicked(name);
  }

  clicked(name: string) {
    if (name == "Lane") {
      this._mActiveLane = true;
      this._mActiveClient = false;
      this._mActiveTransporter = false;
      this.onTabSelect.emit("Lane");
    } else if (name == "Client") {

      this._mActiveLane = false;
      this._mActiveClient = true;
      this._mActiveTransporter = false;
      this.onTabSelect.emit("Client");
    }  else {

      this._mActiveLane = false;
      this._mActiveClient = false;
      this._mActiveTransporter = true;
      // this._mActiveSocialClient = true;

      this.onTabSelect.emit("Transporter");
    }


  }

}
