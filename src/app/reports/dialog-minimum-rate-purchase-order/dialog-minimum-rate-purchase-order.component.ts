import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

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
