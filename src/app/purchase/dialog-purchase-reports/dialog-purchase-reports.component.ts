import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseService } from '../purchase.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-dialog-purchase-reports',
  templateUrl: './dialog-purchase-reports.component.html',
  styleUrls: ['./dialog-purchase-reports.component.css']
})
export class DialogPurchaseReportsComponent implements OnInit {
  displayedColumns: string[] = ['ProductName', 'BrandName', 'Name', 'PurchaseQuantity', 'BuyingPrice', 'Discount', 'FinalPrice'];
  dataSource: any;
  data1: any = [];
  vendorData: any = [];
  purchaseReportId: number;
  PurchaseReportDataArray: any = [];
  vendorName: any;
  orderNo: any;
  sellerName: any;

  constructor(public purchaseService: PurchaseService, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.sellerName = localStorage.getItem('sellerName');
    this.vendorName = data.vendor_name;
    this.orderNo = data.OrderNo;
    // this.getPurchaseReportById(data.PurchaseOrderId);
    this.purchaseService.getPurchaseReportById(data.PurchaseOrderId).subscribe(data => {
      this.PurchaseReportDataArray = data;
      this.dataSource = new MatTableDataSource(this.PurchaseReportDataArray);
    });
  }

  ngOnInit(): void {
    this.getVendorData();
  }


  getTotalCost() {
    return this.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  getFinalPrice() {
    return this.PurchaseReportDataArray.map(o=>o.FinalPrice).reduce((a,c)=>a+c);
  }

  getTotalDiscount() {
    return this.PurchaseReportDataArray.map(o=>o.Discount).reduce((a,c)=>a+c);
  }

  getTotalQuantity() {
    return this.PurchaseReportDataArray.map(o=>o.PurchaseQuantity).reduce((a,c)=>a+c);
  }


  getVendorData() {
    this.purchaseService.getAllVendorData().subscribe(data => {
      this.vendorData = data;
    });
  }

  getPurchaseReportById(id: number) {
    this.purchaseService.getPurchaseReportById(id).subscribe(data => {
      this.PurchaseReportDataArray = data;
      this.dataSource = new MatTableDataSource(this.PurchaseReportDataArray);
    });
  }

}
