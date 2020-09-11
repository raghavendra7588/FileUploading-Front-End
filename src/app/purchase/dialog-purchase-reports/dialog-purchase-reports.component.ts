import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PurchaseService } from '../purchase.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  constructor(public purchaseService: PurchaseService,
     @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogPurchaseReportsComponent>,
    public router: Router) 
    {
 
    this.sellerName = sessionStorage.getItem('sellerName');
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

  getFinalPrice() {
    let totalFinalPrice = 0;
    this.PurchaseReportDataArray.forEach(item => {
      totalFinalPrice += item.FinalPrice;
    });
    return totalFinalPrice;
  }

  getTotalDiscount() {
    let totalDiscount = 0;
    this.PurchaseReportDataArray.forEach(item => {
      totalDiscount += Number(item.Discount);
    });
    return totalDiscount;
  }

  getTotalQuantity() {
    let totalPurchaseQuantity = 0;
    this.PurchaseReportDataArray.forEach(item => {
      // totalPurchaseQuantity += Number(item.availableQuantity);
      totalPurchaseQuantity += Number(item.PurchaseQuantity);
    });
    return totalPurchaseQuantity;
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
