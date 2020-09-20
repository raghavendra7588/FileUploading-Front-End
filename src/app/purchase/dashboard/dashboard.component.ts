import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  noOfOrdersProgress = 0;
  purchasePerDayProgress = 0;
  // NoOfOrdersProgressBar = document.querySelector('.progress-bar');


  constructor(public dialog: MatDialog, public purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.noOfOrdersProgress = 90;
    this.purchasePerDayProgress = 90;
  }


  openDialog() {
    this.dialog.open(AddAddressComponent, {
      height: '600px',
      width: '800px',
    });
  }

}
