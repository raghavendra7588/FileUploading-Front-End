import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VendorView } from '../purchase.model';
import { PurchaseService } from '../purchase.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';

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
  selector: 'app-dialog-view-vendor-data',
  templateUrl: './dialog-view-vendor-data.component.html',
  styleUrls: ['./dialog-view-vendor-data.component.css']
})
export class DialogViewVendorDataComponent implements OnInit {
  particularVendor: any = [];
  sellerId: number;
  vendorId: number;
  priceListData: any = [];
  vendorView: VendorView = new VendorView();
  vendorViewData: any = [];
  vendorName: string;

  displayedColumns: string[] = ['productId', 'brandName', 'productName', 'varient'];
  // dataSource = ELEMENT_DATA;
  dataSource: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public purchaseService: PurchaseService) {
    this.particularVendor = data;
    this.vendorId = Number(this.particularVendor.vendorId);
    console.log('i received ', this.vendorId);
    this.vendorView.vendorId = Number(this.particularVendor.vendorId);

  }

  ngOnInit(): void {
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.vendorView.sellerId = Number(this.sellerId);
    this.getPriceListData();
    this.getVendorViewData();
  }


  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.priceListData = data;
      // console.log('price list data', this.priceListData);
    });
  }

  getVendorViewData() {
    this.purchaseService.getAllVendorViewData(this.vendorView).subscribe(data => {
      console.log('yooo ', data);
      this.vendorViewData = data;
      let uniqueVendorViewData = _.uniqBy(this.vendorViewData, 'ReferenceId');
      this.vendorViewData = [];
      this.vendorViewData = uniqueVendorViewData;
      this.vendorName = this.vendorViewData[0].name;
      this.dataSource = new MatTableDataSource(this.vendorViewData);
    });
  }


}
