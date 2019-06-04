import { Injectable, EventEmitter } from '@angular/core';

export interface ProgressBarEvent{
  id:string
  mode: string

}

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {

  public updateProgressBar$: EventEmitter<ProgressBarEvent>;
  public updateProgressBarDefault$: EventEmitter<any>;

  private requestsRunningDefault = 0;

  private requestsRunning = [];

  constructor() {
    this.updateProgressBar$ = new EventEmitter()
    this.updateProgressBarDefault$ = new EventEmitter();
  }

  public list(): number {
    return this.requestsRunningDefault;
  }

  public increase(id: string = ""): void {
    console.log("esss: ",id);
    
    if (id) {
      if (this.requestsRunning[id]) {
        this.requestsRunning[id]++
      } else {
        this.requestsRunning[id] = 1
      }
      if (this.requestsRunning[id] === 1) {
        this.updateProgressBar$.emit({ 'id': id, mode: 'indeterminate' });
      }

    } else {
      this.requestsRunningDefault++;
      if (this.requestsRunningDefault === 1) {
        this.updateProgressBarDefault$.emit('indeterminate');
      }
    }

  }

  public decrease(id: string = ""): void {
    if (id) {
      if (this.requestsRunning[id] && this.requestsRunning[id] > 0) {
        this.requestsRunning[id]--
      } else {
        this.requestsRunning[id] = 0
      }
      if (this.requestsRunning[id] === 0) {
        this.updateProgressBar$.emit({ 'id': id, mode: 'none' });
      }
    } else {
      if (this.requestsRunningDefault > 0) {
        this.requestsRunningDefault--;
        if (this.requestsRunningDefault === 0) {
          this.updateProgressBarDefault$.emit('none');
        }
      }
    }
  }

  /* ***********************************************************************************************************************************
   *                                                                      mapping
   */


  static IDS = {
    _: "_",
    AUTH: "auth",
    ANALYSIS: "analysis"
  }

  static MODES = {
    NONE: "none",
    indeterminate: "indeterminate"
  }
}
