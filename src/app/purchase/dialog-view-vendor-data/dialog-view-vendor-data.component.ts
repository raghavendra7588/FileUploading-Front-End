import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VendorView } from '../purchase.model';
import { PurchaseService } from '../purchase.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';


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

  displayedColumns: string[] = ['productId', 'category', 'subCategory', 'brandName', 'productName', 'varient'];
  dataSource: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public purchaseService: PurchaseService) {
    this.particularVendor = data;
    this.vendorId = Number(this.particularVendor.vendorId);
    console.log('i received ', this.vendorId);
    this.vendorView.vendorId = Number(this.particularVendor.vendorId);
    this.vendorName = this.particularVendor.name;

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
      // this.vendorName = this.vendorViewData[0].name;
      this.dataSource = new MatTableDataSource(this.vendorViewData);
    });
  }


}
