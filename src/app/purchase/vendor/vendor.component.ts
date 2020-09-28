import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentVendorComponent } from '../dialog-content-vendor/dialog-content-vendor.component';
import { Subscription } from 'rxjs';
import { EmitterService } from 'src/shared/emitter.service';
import { LoginService } from 'src/app/login/login.service';
import { DialogViewVendorDataComponent } from '../dialog-view-vendor-data/dialog-view-vendor-data.component';


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  displayedColumns: string[] = ['name', 'registrationDate', 'email', 'bankName', 'creditLimit', 'creditLimitDays', 'transporter', 'action', 'view'];

  dataSource: any;
  newRecordSubscription: Subscription;
  sellerId: any;
  strSellerId: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, public purchaseService: PurchaseService, public emitterService: EmitterService, public loginService: LoginService) { }

  ngOnInit() {
    // this.manager = sessionStorage.getItem(this.constantService.RESOURCE_MANAGER);
    // this.fullName = sessionStorage.getItem(this.constantService.FULLNAME);
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.sellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();

    this.newRecordSubscription = this.emitterService.isVendorMasterUpdated.subscribe(value => {
      if (value) {
        this.getVendorData();
      }
    });
    this.getEveryBrandData();
  }


  openDialog() {
    this.dialog.open(DialogContentVendorComponent, {
      height: '600px',
      width: '800px',
    });
  }


  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.dataSource = data;
    });
  }


  editEmployee(vendor) {
    this.dialog.open(DialogContentVendorComponent, {
      height: '600px',
      width: '800px',
      data: vendor
    });
  }


  getEveryBrandData() {
    this.purchaseService.getEveryBrand().subscribe(data => {
      this.purchaseService.allBrandData = data;
    });
  }

  viewVendorDetails(element) {
    console.log('pass this',element);
    this.dialog.open(DialogViewVendorDataComponent, {
      height: '600px',
      width: '1000px',
      data: element
    });
  }
}
