import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-print-purchase-report',
  templateUrl: './dialog-print-purchase-report.component.html',
  styleUrls: ['./dialog-print-purchase-report.component.css']
})
export class DialogPrintPurchaseReportComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Name', 'PurchaseQuantity', 'Discount','BuyingPrice', 'TotalPrice'];
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [{
      ProductName:'dummyProductName',
      BrandName:'dummyBrandName',
      Name:'dummyVarientName',
      PurchaseQuantity:'37',
      BuyingPrice:'68',
      FinalPrice:'2516',
      Discount:'4'
    }];
  }



  
//   {
//     ProductName:'dummyProductName',
//     BrandName:'dummyBrandName',
//     Name:'dummyVarientName',
//     PurchaseQuantity:'22',
//     BuyingPrice:'56',
//     FinalPrice:'2663',
//     Discount:'2'
//   },
// {
//   ProductName:'dummyProductName',
//   BrandName:'dummyBrandName',
//   Name:'dummyVarientName',
//   PurchaseQuantity:'14',
//   BuyingPrice:'24',
//   FinalPrice:'14476',
//   Discount:'2'
// }

}
