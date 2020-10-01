import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddAddressComponent } from '../add-address/add-address.component';
import { DashBoardPurchaseOrderPerDay, DashBoardPurchaseOrderPerMonth, DashBoardPurchasePerDay, DashBoardPurchasePerMonth, FastestGrowingProducts } from '../purchase.model';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashBoardPurchasePerDay: DashBoardPurchasePerDay = new DashBoardPurchasePerDay();
  dashBoardPurchasePerMonth: DashBoardPurchasePerMonth = new DashBoardPurchasePerMonth();
  dashBoardPurchaseOrderPerDay: DashBoardPurchaseOrderPerDay = new DashBoardPurchaseOrderPerDay();
  dashBoardPurchaseOrderPerMonth: DashBoardPurchaseOrderPerMonth = new DashBoardPurchaseOrderPerMonth();
  fastestGrowingProducts: FastestGrowingProducts = new FastestGrowingProducts();

  noOfOrdersProgress = 0;
  purchasePerDayProgress = 0;
  purchasePerMonth = 0;
  currentDate: any;
  firstDayOfMonth: any;
  lastDayOfMonth: any;
  purchasePerDayArray: any = [];
  purchasePerMonthArray: any = [];
  purchaseOrderPerDayArray: any = [];
  purchaseOrderPerMonthArray: any = [];
  purchasePerDayResult = 0;
  purchasePerMonthResult = 0;
  purchaseOrderPerDayResult = 0;
  purchaseOrderPerMonthResult = 0;
  saleForTheDay = 845;
  lastDays: any;
  dummyData: any = [];
  strSellerId: string;
  topPurchaseOrderData: any = [];
  // NoOfOrdersProgressBar = document.querySelector('.progress-bar');


  constructor(
    public dialog: MatDialog,
    public router: Router,
    public purchaseService: PurchaseService,
  ) { }

  ngOnInit(): void {
    this.dashBoardPurchasePerDay.SellerId = sessionStorage.getItem('sellerId').toString();
    this.dashBoardPurchasePerMonth.SellerId = sessionStorage.getItem('sellerId').toString();
    this.dashBoardPurchaseOrderPerDay.SellerId = sessionStorage.getItem('sellerId').toString();
    this.dashBoardPurchaseOrderPerMonth.SellerId = sessionStorage.getItem('sellerId').toString();
    this.fastestGrowingProducts.SellerId = sessionStorage.getItem('sellerId').toString();
    this.strSellerId = sessionStorage.getItem('sellerId').toString();
    this.currentDate = new Date();
    this.lastDays = this.lastThirtyDaysData(30);
    this.fastestGrowingProducts.StartDate = this.convertDate(this.currentDate);
    this.fastestGrowingProducts.EndDate = this.convertDate(this.lastDays);

    console.log('fastestGrowingProducts.StartDate', this.fastestGrowingProducts.StartDate);
    console.log('fastestGrowingProducts.EndDate', this.fastestGrowingProducts.EndDate);

    this.dashBoardPurchasePerDay.CurrentDate = this.convertDate(this.currentDate);
    this.dashBoardPurchaseOrderPerDay.CurrentDate = this.convertDate(this.currentDate);

    // this.getAllPurchasePerDayData(this.dashBoardPurchasePerDay);

    this.noOfOrdersProgress = 90;
    this.purchasePerDayProgress = 90;
    this.purchasePerMonth = 18070;

    // var month = 'MAY'
    // var a = '1-' + month + '-2015';
    let date = new Date();
    this.firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.dashBoardPurchasePerMonth.StartDate = this.convertDate(this.firstDayOfMonth);
    this.dashBoardPurchasePerMonth.EndDate = this.convertDate(this.lastDayOfMonth);

    this.dashBoardPurchaseOrderPerMonth.StartDate = this.convertDate(this.firstDayOfMonth);
    this.dashBoardPurchaseOrderPerMonth.EndDate = this.convertDate(this.lastDayOfMonth);

    // console.log(this.dashBoardPurchaseOrderPerMonth.StartDate);
    // console.log(this.dashBoardPurchaseOrderPerMonth.EndDate);

    this.getAllPurchasePerMonthData(this.dashBoardPurchasePerMonth);
    // console.log('per day', this.dashBoardPurchaseOrderPerDay);
    this.getPurchaseOrderPerDayData(this.dashBoardPurchaseOrderPerDay);
    // this.getPurchaseOrderPerMonthData(this.dashBoardPurchaseOrderPerMonth);
    this.getFastestMovingDataPerMonth();
    this.dummyData = [
      { subCategory: '85', brandID: '126', productID: '2751', varient: '200 GM', Purchased: '12' },
      { subCategory: '85', brandID: '246', productID: '2750', varient: '1 KG', Purchased: '08' },
      { subCategory: '85', brandID: '237', productID: '1607', varient: '500 GM', Purchased: '09' },
    ];
  }

  lastThirtyDaysData(days) {
    var today = new Date();
    var dateLimit = new Date(new Date().setDate(today.getDate() - 30));
    return dateLimit;
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


  getAllPurchasePerDayData(dashBoardPurchasePerDay) {
    this.purchaseService.getDashBoardPurchasePerDayData(dashBoardPurchasePerDay).subscribe(data => {
      this.purchasePerDayArray = data;
      // console.log('PurchasePerDay', data);
      this.purchasePerDayResult = this.getPurchasePerDayComputation();

    });
  }
  getAllPurchasePerMonthData(dashBoardPurchasePerMonth) {
    this.purchaseService.getDashBoardPurchasePerMonthData(dashBoardPurchasePerMonth).subscribe(data => {

      this.purchasePerMonthArray = data;
      // console.log('PurchasePerMonth', data);
      this.purchasePerMonthResult = this.getPurchasePerMonthComputation();

    });
  }

  getPurchaseOrderPerDayData(dashBoardPurchasePerDay) {
    this.purchaseService.getDashBoardPurchaseOrderPerDayData(dashBoardPurchasePerDay).subscribe(data => {
      console.log(data);
      // console.log('PurchaseOrderPerDay', data);
      this.purchaseOrderPerDayArray = data;
      this.purchaseOrderPerDayResult = this.getPurchasePerOrderDayComputation();

    });
  }

  // getPurchaseOrderPerMonthData(dashBoardPurchasePerMonth) {
  //   this.purchaseService.getDashBoardPurchaseOrderPerMonth(dashBoardPurchasePerMonth).subscribe(
  //     data => {
  //       console.log('PurchaseOrderPerMonth', data);
  //       this.purchaseOrderPerMonthArray = data;
  //       this.purchaseOrderPerMonthResult = this.getPurchasePerOrderMonthComputation();
  //       console.log('PurchaseORDER PER MONTH', this.purchaseOrderPerMonthResult);
  //     }
  //   );
  // }

  getFastestMovingDataPerMonth() {
    this.purchaseService.getFastestMovingDataPerMonth(this.strSellerId).subscribe(data => {
      console.log('fastest growing data', data);
      this.topPurchaseOrderData = data;
    });
  }

  getPurchasePerDayComputation() {
    let totalPurchaseBuyingPrice = 0;
    let totalPurchaseDiscount = 0;
    let totalPurchasePerDayCalculation;
    this.purchasePerDayArray.forEach(item => {
      totalPurchaseBuyingPrice += Number(item.BuyingPrice);
      totalPurchaseDiscount += Number(item.Discount);
    });
    totalPurchasePerDayCalculation = totalPurchaseBuyingPrice - totalPurchaseDiscount;
    return totalPurchasePerDayCalculation;
  }

  getPurchasePerMonthComputation() {
    let totalPurchaseBuyingPrice = 0;
    let totalPurchaseDiscount = 0;
    let totalPurchasePerMonthCalculation = 0;
    this.purchasePerMonthArray.forEach(item => {
      totalPurchaseBuyingPrice += Number(item.BuyingPrice);
      totalPurchaseDiscount += Number(item.Discount);
    });
    totalPurchasePerMonthCalculation = totalPurchaseBuyingPrice - totalPurchaseDiscount;
    // console.log('totalPurchasePerMonthCalculation', totalPurchasePerMonthCalculation);
    return totalPurchasePerMonthCalculation;
  }

  getPurchasePerOrderDayComputation() {
    let totalPurchaseOrderPerDay = 0;
    this.purchaseOrderPerDayArray.forEach(item => {
      totalPurchaseOrderPerDay++;
    });
    return totalPurchaseOrderPerDay;
  }

  getPurchasePerOrderMonthComputation() {
    let totalPurchaseOrderPerMonth = 0;
    this.purchaseOrderPerMonthArray.forEach(item => {
      totalPurchaseOrderPerMonth++;
    });
    return totalPurchaseOrderPerMonth;
  }



  addAddress() {
    // this.dialog.open(AddAddressComponent, {
    //   height: '600px',
    //   width: '800px',
    // });

    this.router.navigate(['purchase/address']);
  }

  createVendor() {
    this.router.navigate(['purchase/vendor']);
  }

  createOrder() {
    this.router.navigate(['purchase/purchaseOrder']);
  }

  goToPriceList() {
    this.router.navigate(['purchase/priceList']);
  }
}
