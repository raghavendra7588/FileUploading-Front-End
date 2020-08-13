import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrder } from '../purchase.model';
import { GetPriceListComponent } from '../get-price-list/get-price-list.component';
import { PurchaseService } from '../purchase.service';
// import { DialogContentVendorComponent } from '../dialog-content-vendor/dialog-content-vendor.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  purchaseOrder: PurchaseOrder = new PurchaseOrder();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  vendorData: any = [];

  priceListData: any = [];
  sellerId: any;
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];



  constructor(public dialog: MatDialog, public purchaseService: PurchaseService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.purchaseOrder.orderDate = new Date();
    // this.getBrandsMasterData();
    this.getVendorData();
    this.sellerId = Number(localStorage.getItem('sellerId'));
    this.priceListData = this.purchaseService.getAllPriceListData(this.sellerId);
    console.log('received PRICE LIST from service', this.priceListData);
  }

  getVendorData() {
    this.purchaseService.getAllVendorData().subscribe(data => {
      this.vendorData = data;
      // console.log('i received vendor Data', this.vendorData);
    });
  }

  openDialog() {
    this.dialog.open(GetPriceListComponent, {
      height: '600px',
      width: '800px',
    });
  }

}
