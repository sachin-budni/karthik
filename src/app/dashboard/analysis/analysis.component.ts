import { Component, OnInit } from '@angular/core';
import { ApiAnalysisService } from 'src/app/service/api';
import { ResponseTrip } from 'src/app/service/api/params';
import { ChartjsBar, ChartjsBarData } from 'src/app/shared/charts/models';
import { SharedDataService } from 'src/app/service';
import { ProgressBarService } from 'src/app/core/services/progress-bar.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogProgress } from 'src/app/shared/dialogs/progress/dialog-progress';
import { DialogModelProgress } from 'src/app/shared/dialogs/progress';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  _mInProgress = false
  progressDialogRef: MatDialogRef<DialogProgress, any>;

  date = new Date((new Date().getTime() - 3888000000));
  constructor(public dialog: MatDialog,
    private serviceProgressBar: ProgressBarService,
    public snackBar: MatSnackBar,
    private apiSharedDataService: SharedDataService) {

  }

  ngOnInit() {

    this.serviceProgressBar.increase(ProgressBarService.IDS.ANALYSIS);
    setTimeout(() => this.openProgress());
    this.apiSharedDataService.getAnalysisEmitter(true).subscribe(
      (value: ResponseTrip[]) => {
        // console.log("items: ", value);
        this.closeProgress()

      },
      (error) => {
        console.log("error: ", error);
        this.snackBar.open("Unable To fetch data.", null, {
          duration: 2000,
        });

        this.closeProgress()

      }
    )
  }

  openProgress() {
    this._mInProgress = true
    // let alert: DialogModelProgress = new DialogModelProgress("Under Progress...", "", null, null);
    // this.progressDialogRef = this.dialog.open(DialogProgress, {
    //   data: alert,
    //   disableClose: true
    // });
  }

  closeProgress() {
    this.serviceProgressBar.decrease(ProgressBarService.IDS.ANALYSIS);
    // this.progressDialogRef.close()
    this._mInProgress = false

  }




}
