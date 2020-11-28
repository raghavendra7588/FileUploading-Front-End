import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';
import { Address } from '../purchase.model';
import { EmitterService } from 'src/shared/emitter.service';
import { LoginService } from 'src/app/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit {

  getAddress: any = [];
  // displayedColumns: string[] = ['billingName', 'address', 'city', 'email', 'phone', 'action'];
  displayedColumns: string[] = ['billingName', 'address', 'phone', 'action'];
  dataSource: any;
  sellerId: number;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public purchaseService: PurchaseService,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getAddressDetails();
    this.emitterService.isAddressCreated.subscribe(value => {
      if (value) {
        this.getAddressDetails();
      }
    });
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
  }


  getAddressDetails() {
    this.purchaseService.getAddressData().subscribe(data => {
      this.getAddress = data;
      this.dataSource = new MatTableDataSource(this.getAddress);
      this.dataSource.paginator = this.paginator;
      // setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }


  openDialog() {
    this.dialog.open(AddAddressComponent, {
      height: '600px',
      width: '800px'
    });
  }

  editEmployee(element) {
    this.dialog.open(AddAddressComponent, {
      height: '600px',
      width: '800px',
      data: element
    });
  }
}