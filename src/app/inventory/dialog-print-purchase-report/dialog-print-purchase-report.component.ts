import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-dialog-print-purchase-report',
  templateUrl: './dialog-print-purchase-report.component.html',
  styleUrls: ['./dialog-print-purchase-report.component.css']
})
export class DialogPrintPurchaseReportComponent implements OnInit {
  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount'];

  dataSource: any;
  purchaseData: any = [];
  response: any = [];
  sellerName: string;
  productName: string;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public inventoryService: InventoryService) {
    this.response = data;
    this.productName = data.ProductName;
    this.purchaseData.push(this.response);
    this.dataSource = new MatTableDataSource(this.purchaseData);

  }

  ngOnInit(): void {
    this.sellerName = sessionStorage.getItem('sellerName').toString();
  }

}
