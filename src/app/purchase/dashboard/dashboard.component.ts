import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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


  constructor(
    public dialog: MatDialog,
    public router: Router,
    public purchaseService: PurchaseService,
  ) { }

  ngOnInit(): void {
    this.noOfOrdersProgress = 90;
    this.purchasePerDayProgress = 90;
  }

  addAddress() {
    // this.dialog.open(AddAddressComponent, {
    //   height: '600px',
    //   width: '800px',
    // });

    this.router.navigate(['purchase/address']);
  }

  createVendor() {
    this.router.navigate(['purchase/vendor']);
  }

  createOrder() {
    this.router.navigate(['purchase/purchaseOrder']);
  }

  goToPriceList(){
    this.router.navigate(['purchase/priceList']);
  }
}
