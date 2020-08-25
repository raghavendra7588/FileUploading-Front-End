import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EmitterService } from 'src/shared/emitter.service';
import { Router } from '@angular/router';
import { PurchaseOrder } from '../purchase.model';
import { DialogPurchaseReportsComponent } from '../dialog-purchase-reports/dialog-purchase-reports.component';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';

@Component({
  selector: 'app-dialog-purchase-order-print',
  templateUrl: './dialog-purchase-order-print.component.html',
  styleUrls: ['./dialog-purchase-order-print.component.css']
})
export class DialogPurchaseOrderPrintComponent implements OnInit {
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  purchaseOrderData: any;
  orderNo: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogPurchaseOrderPrintComponent>,
    public emitterService: EmitterService,
    public router: Router,
    public dialog: MatDialog) {
    this.purchaseOrderData = data;
    this.orderNo = data;
  }

  ngOnInit(): void {

  }

  printData() {

    this.dialogRef.close(true);
    this.emitterService.print.emit(true);
    // this.router.navigate(['/dashboard']);
  }
  notPrint() {

    this.dialogRef.close(true);
    this.emitterService.notPrint.emit(true);
    // this.router.navigate(['/dashboard']);
  }

  agreeToPrint() {
    this.dialog.open(DialogOrderComponent, {
      disableClose: true,
      height: '650px',
      width: '800px',
      data: this.purchaseOrderData
    });
  }

}
