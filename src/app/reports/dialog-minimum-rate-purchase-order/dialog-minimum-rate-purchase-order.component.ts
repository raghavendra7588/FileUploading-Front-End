import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dialog-minimum-rate-purchase-order',
  templateUrl: './dialog-minimum-rate-purchase-order.component.html',
  styleUrls: ['./dialog-minimum-rate-purchase-order.component.css']
})
export class DialogMinimumRatePurchaseOrderComponent implements OnInit {
  response: any = [];
  responseDataArray: any = [];
  dataSource: any = [];
  vendorName: any;
  orderNo: any;
  sellerName: string;

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount'];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('this is data', data);
    this.response = data;
    this.vendorName = this.response.VendorName;
    this.orderNo = this.response.OrderNo;

    this.responseDataArray.push(this.response);
    this.dataSource = new MatTableDataSource(this.responseDataArray);

    this.sellerName = sessionStorage.getItem('sellerName');
  }

//   constructor(@Inject(MAT_DIALOG_DATA) public data: any,
//   public inventoryService: InventoryService) {
//   this.response = data;
//   this.productName = data.ProductName;
//   this.purchaseData.push(this.response);
//   this.dataSource = new MatTableDataSource(this.purchaseData);

// }

  ngOnInit(): void {
  }

}
