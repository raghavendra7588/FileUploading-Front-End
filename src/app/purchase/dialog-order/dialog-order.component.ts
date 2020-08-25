import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Name', 'availableQuantity', 'buyingPrice', 'discount', 'finalPrice'];
  dataSource: any;
  PurchaseReportDataArray: any = [];
  sellerName: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogOrderComponent>,
    public dialog: MatDialog) {
    this.PurchaseReportDataArray = data;
    this.dataSource = new MatTableDataSource(this.PurchaseReportDataArray.items);
    this.sellerName = localStorage.getItem('sellerName');
  }

  ngOnInit(): void {
  }



  getFinalPrice() {
    return this.PurchaseReportDataArray.map(o => o.finalPrice).reduce((a, c) => a + c);
  }

  getTotalDiscount() {
    // return this.PurchaseReportDataArray.map(o => o.discount).reduce((a, c) => Number(a) + Number(c));
   return  this.PurchaseReportDataArray.reduce((s, a) => s + a.discount, 0);
  }

  getTotalQuantity() {
    return this.PurchaseReportDataArray.map(o => o.availableQuantity).reduce((a, c) => Number(a) + Number(c));
  }


}
