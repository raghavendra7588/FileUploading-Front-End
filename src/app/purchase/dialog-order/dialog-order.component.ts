import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmitterService } from 'src/shared/emitter.service';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Name', 'PurchaseQuantity', 'BuyingPrice', 'Discount', 'FinalPrice'];
  dataSource: any;
  PurchaseReportDataArray: any = [];
  totalRecords: any = [];
  sellerName: string;
  orderNumber: number;
  vendorName: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogOrderComponent>,
    public dialog: MatDialog,
    public emitterService: EmitterService,
    public purchaseService: PurchaseService) {
    this.orderNumber = data.OrderNo;
    this.vendorName = data.vendorName
    this.purchaseService.getPurchaseReportById(data.PurchaseOrderId).subscribe(data => {
      console.log(data);
      this.PurchaseReportDataArray = data;
      this.totalRecords = data;
      this.dataSource = new MatTableDataSource(this.PurchaseReportDataArray);
    });
    this.sellerName = localStorage.getItem('sellerName');

  }

  ngOnInit(): void {
  }

  getFinalPrice() {
    let totalFinalPrice = 0;
    this.totalRecords.forEach(item => {
      totalFinalPrice += item.FinalPrice;
    });
    return totalFinalPrice;
  }

  getTotalDiscount() {
    let totalDiscount = 0;
    this.totalRecords.forEach(item => {
      totalDiscount += item.Discount;
    });
    return totalDiscount;

  }

  getTotalQuantity() {
    let totalQuantity = 0;
    let parsedQuantity: number = 0;
    this.totalRecords.forEach(item => {

      totalQuantity += item.PurchaseQuantity;
    });
    return totalQuantity;
  }

}
