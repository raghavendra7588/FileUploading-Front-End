import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogPurchaseReportsComponent } from '../dialog-purchase-reports/dialog-purchase-reports.component';
import { PurchaseService } from '../purchase.service';
import { PurchaseReport, PurchaseReportData } from '../purchase.model';


@Component({
  selector: 'app-purchase-reports',
  templateUrl: './purchase-reports.component.html',
  styleUrls: ['./purchase-reports.component.css']
})
export class PurchaseReportsComponent implements OnInit {
  displayedColumns: string[] = ['vendorName', 'orderNo', 'orderDate', 'deliveryDate', 'batchNo', 'orderedTimeStamp', 'print'];
  dataSource: any;
  dummyData: any;
  vendorData: any;
  vendorId: any;
  sellerId: string;
  purchaseReport: PurchaseReport = new PurchaseReport();
  purchaseReportData: PurchaseReportData = new PurchaseReportData();
  purchaseReportArray: any = [];
  strSellerId: string;


  constructor(public dialog: MatDialog, public purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.strSellerId = sessionStorage.getItem('sellerId');
    this.getVendorData();
    this.sellerId = sessionStorage.getItem('sellerId');
    this.purchaseReportData.sellerId = this.sellerId;
  }

  viewPurchaseOrder(data) {
    this.dialog.open(DialogPurchaseReportsComponent, {
      height: '600px',
      width: '1200px',
      data: data
    });
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  selectedVendorFromList(item) {
    // this.vendorId = item.vendorId;
    // this.purchaseOrder.email = item.email;
    // this.purchaseOrder.gstType = item.gstCategory;
    this.vendorId = item.vendorId;
  }

  getVendorData() {
    this.purchaseService.getAllVendorData(this.strSellerId).subscribe(data => {
      this.vendorData = data;
      console.log('vendor data purchase reports ', this.vendorData);
    });
  }

  convertDate(receivedDate) {
    let date = new Date(receivedDate);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const stringDate = [day, month, year].join("/");
    let fullDate = stringDate;
    return fullDate
  }

  searchRecords() {

    if (this.purchaseReport.vendorId === null || this.purchaseReport.vendorId === undefined || this.purchaseReport.vendorId === '') {
      this.purchaseReportData.vendorId = 'ALL';
    }
    else {
      this.purchaseReportData.vendorId = this.purchaseReport.vendorId;
    }

    if (this.purchaseReport.orderNo === null || this.purchaseReport.orderNo === undefined || this.purchaseReport.orderNo === '') {
      this.purchaseReportData.orderNo = 'ALL';
    }
    else {
      this.purchaseReportData.orderNo = this.purchaseReport.orderNo;
    }

    if (this.purchaseReport.startDate === null || this.purchaseReport.startDate === undefined) {
      this.purchaseReportData.startDate = 'ALL';
    }
    else {
      let startDate = this.convertDate(this.purchaseReport.startDate);
      this.purchaseReportData.startDate = startDate;
    }

    if (this.purchaseReport.endDate === null || this.purchaseReport.endDate === undefined) {
      this.purchaseReportData.endDate = 'ALL';
    }
    else {
      let endDate = this.convertDate(this.purchaseReport.endDate);
      this.purchaseReportData.endDate = endDate;
    }
    this.purchaseReportData.sellerId = this.sellerId;
    this.purchaseService.getPurchaseReportData(this.purchaseReportData).subscribe(data => {

      this.purchaseReportArray = data;
      this.dataSource = new MatTableDataSource(this.purchaseReportArray);
      // this.clearValues();
    });
  }

  purchaseReportAllData() {
    this.purchaseService.getPurchaseReportData(this.purchaseReport).subscribe(data => {
      this.purchaseReportArray = data;
      this.dataSource = new MatTableDataSource(this.purchaseReportArray);
    });
  }

  clearValues() {
    this.purchaseReport.vendorId = '';
    this.purchaseReport.orderNo = '';
    this.purchaseReport.startDate = '';
    this.purchaseReport.endDate = '';
  }


}
