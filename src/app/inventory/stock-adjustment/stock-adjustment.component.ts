import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseService } from 'src/app/purchase/purchase.service';
import { GetPurchaseItemData, GetPurchaseReport } from 'src/app/purchase/purchase.model';



@Component({
  selector: 'app-stock-adjustment',
  templateUrl: './stock-adjustment.component.html',
  styleUrls: ['./stock-adjustment.component.css']
})
export class StockAdjustmentComponent implements OnInit {

  displayedColumns: string[] = ['subCategory', 'brand', 'product', 'varient', 'quantityOrdered', 'quantityReceived', 'Discount', 'sellingPrice', 'barCode', 'action'];

  dataSource: any;
  vendorData: any = [];
  vendorId: number;
  strSellerId: string;
  numSellerId: number;
  customObj: any = [];
  dbData: any = [];
  getPurchaseReport: GetPurchaseReport = new GetPurchaseReport();
  getPurchaseItemData: GetPurchaseItemData = new GetPurchaseItemData();
  purchaseReportData: any = [];
  purchaseOrderItemData: any = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    public purchaseService: PurchaseService) { }

  ngOnInit() {

    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getPurchaseReport.sellerId = sessionStorage.getItem('sellerId');
    this.getPurchaseItemData.sellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();


    this.customObj = [
      { subCategory: 'subCategory1', brand: 'brand1', varient: 'varient1', quantityOrdered: '6', quantityReceived: '2', Discount: '3', sellingPrice: '45', barCode: 'NULL', ProductVarientId: 100 },
      { subCategory: 'subCategory2', brand: 'brand2', varient: 'varient2', quantityOrdered: '7', quantityReceived: '3', Discount: '4', sellingPrice: '46', barCode: 'NULL', ProductVarientId: 1 },
      { subCategory: 'subCategory3', brand: 'brand3', varient: 'varient3', quantityOrdered: '8', quantityReceived: '4', Discount: '5', sellingPrice: '47', barCode: 'NULL', ProductVarientId: 2 },
    ];
    this.dbData = [
      { subCategory: 'subCategory1', brand: 'brand1', varient: 'varient1', quantityOrdered: '100', quantityReceived: '100', Discount: '100', sellingPrice: '100', barCode: 'NULL', ProductVarientId: 2 }
    ];
    let anyData = [];
    anyData = this.mapObj(this.customObj, this.dbData);

  }

  selectedVendorFromList(item) {
    console.log(item);
    this.getPurchaseReport.vendorId = Number(item.vendorId);
    this.getPurchaseItemData.vendorId = Number(item.vendorId);
    this.purchaseReportData = [];
    this.purchaseService.getAllPurchaseOrderData(this.getPurchaseReport).subscribe(data => {
      this.purchaseReportData = data;
      console.log(data);
    })
  }

  SearchRecords() {
    this.purchaseService.getAllPurchaseOrderItemData(this.getPurchaseItemData).subscribe(data => {
      this.purchaseOrderItemData = data;
      console.log(data);
      let customizedPurchaseOrderItemResponse = this.customPurchaseOrderItemResponse(this.purchaseOrderItemData);
      this.purchaseOrderItemData = [];
      this.purchaseOrderItemData = customizedPurchaseOrderItemResponse;
      this.dataSource = new MatTableDataSource(this.purchaseOrderItemData);
    })


  }
  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      this.purchaseService.allvendorData = data;
    });
  }

  editItem(response: any) {
    console.log(response);
  }
  selectedOrderNumberList(response: any) {
    console.log(response);
    this.getPurchaseItemData.orderNo = response.OrderNo;
    this.getPurchaseItemData.purchaseOrderId = response.PurchaseOrderId;
  }

  mapObj(apiData, ownDbData) {
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].quantityReceived = 0;
      apiData[i].Discount = 0;
      apiData[i].sellingPrice = 0;
      apiData[i].barCode = 'NULL';
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
          console.log('inside bro');
          apiData[i].quantityReceived = ownDbData[j].quantityReceived;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].sellingPrice = ownDbData[j].sellingPrice;
          apiData[i].barCode = ownDbData[j].barCode;
        }
      }
    }
    return apiData;
  }


  customPurchaseOrderItemResponse(array) {
    for (let i = 0; i < array.length; i++) {
      array[i].CreatedAt = '';
      array[i].BuyingPrice = 0;
      array[i].FinalPrice = 0;
    }
    return array;
  }

}
