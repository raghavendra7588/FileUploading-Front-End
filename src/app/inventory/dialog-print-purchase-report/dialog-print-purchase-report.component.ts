import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-print-purchase-report',
  templateUrl: './dialog-print-purchase-report.component.html',
  styleUrls: ['./dialog-print-purchase-report.component.css']
})
export class DialogPrintPurchaseReportComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount',
    'TotalQuantityOrder', 'TotalFinalPrice', 'TotalDiscountPrice', 'FinalPurchaseAmount'];
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [{
      ProductName: 'dummyProductName',
      BrandName: 'dummyBrandName',
      Varient: 'dummyVarientName',
      ProductMRP: '37',
      ProductDiscount: '68',
      TotalQuantityOrder: '20',
      TotalFinalPrice: '1200',
      TotalDiscountPrice: '100',
      FinalPurchaseAmount: '2000'
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
