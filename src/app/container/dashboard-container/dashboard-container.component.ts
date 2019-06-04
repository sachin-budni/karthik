import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  _mActiveHome: boolean = true;
  _mActiveTrips: boolean = false;
  constructor(private _element: ElementRef, private location: Location, private router: Router) {
  }




  ngOnInit() {

  }



}
