import { Component, OnInit, ViewChild } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentVendorComponent } from '../dialog-content-vendor/dialog-content-vendor.component';
import { Subscription } from 'rxjs';
import { EmitterService } from 'src/shared/emitter.service';
import { LoginService } from 'src/app/login/login.service';


@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  displayedColumns: string[] = ['name', 'registrationDate','email', 'bankName', 'creditLimit', 'creditLimitDays','transporter', 'action'];

  dataSource: any;
  newRecordSubscription: Subscription;
  sellerId: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, public purchaseService: PurchaseService, public emitterService: EmitterService, public loginService: LoginService) { }

  ngOnInit() {
    // this.manager = localStorage.getItem(this.constantService.RESOURCE_MANAGER);
    // this.fullName = localStorage.getItem(this.constantService.FULLNAME);

    this.sellerId = localStorage.getItem('sellerId');
    this.getVendorData();

    this.newRecordSubscription = this.emitterService.isVendorMasterUpdated.subscribe(value => {
      if (value) {
        this.getVendorData();
      }
    });
  }


  openDialog() {
    this.dialog.open(DialogContentVendorComponent, {
      height: '600px',
      width: '800px',
    });
  }


  getVendorData() {
    this.purchaseService.getAllVendorData().subscribe(data => {
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

}
