import { Component, OnInit } from '@angular/core';
import { add } from 'lodash';
import { BuyProductsService } from '../buy-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseProducts } from '../buy-products.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderNoComponent } from '../dialog-order-no/dialog-order-no.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  deliveryType: any = [];
  paymentType: any = [];
  deliveryTime: any = [];
  addressData: any = [];

  deliveryTypeStr: string;
  paymentTypeStr: string;
  deliveryTimeStr: string;
  deliveryDate: any;

  subTotal = 0.00;
  discountTotal = 0.00;
  finalAmountTotal = 0.00;
  vendorId: string;
  addressId: number;

  name: string;
  houseNo: string;
  landMark: string;
  society: string;
  pinCode: number;
  city: string;
  area: string;
  state: string;
  orderDate: any;
  purchaseProductResponse: any = [];
  ProductsResponse: any;
  prevDeliveryDate: any;
  minDate: any;

  purchaseProducts: PurchaseProducts = new PurchaseProducts();


  constructor(
    public buyProductsService: BuyProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {
    this.minDate = new Date();
  }


  ngOnInit(): void {
    this.vendorId = sessionStorage.getItem('vendorId');
    this.addressId = Number(sessionStorage.getItem('address_id'));
    this.purchaseProducts.AddressId = Number(sessionStorage.getItem('address_id'));
    this.purchaseProducts.OrderNo = (this.getRandomNumbers()).toString();

    this.orderDate = new Date();
    console.log('orderDate', this.orderDate);
    let orderDate = this.convertDate(this.orderDate);
    this.purchaseProducts.OrderDate = orderDate;

    this.deliveryType = [
      { id: 0, type: 'Pickup from Shop' },
      { id: 1, type: 'Home Delivery' }
    ];

    this.paymentType = [
      { id: 0, type: 'Cash' },
      { id: 1, type: 'Credit' },
      { id: 2, type: 'Online' }
    ];

    this.deliveryTime = [
      { id: 0, type: '9.00 AM - 1.00PM' },
      { id: 1, type: '1.00 AM - 5.00PM' },
      { id: 2, type: '5.00 AM - 9.00PM' },
      { id: 3, type: 'Anytime Ok' }
    ];

    this.buyProductsService.getAddressDataById(this.vendorId).subscribe(data => {
      this.addressData = data;
      console.log('adddress  api data', this.addressData);

    });
    this.getAddressData();
    // this.getSpecificAddress(this.addressData, this.addressId);
  }

  selectedDeliveryTypeFromList(response) {
    console.log(response);

  }
  selectedPaymentTermFromList(response) {
    console.log(response);
  }


  getAddressData() {
    this.buyProductsService.getAddressDataById(this.vendorId).subscribe(data => {
      this.addressData = data;
      this.getSpecificAddress(this.addressData, this.addressId);
    });
  }

  getSpecificAddress(address, id) {
    address.filter(data => {
      if (data.id === id) {
        this.name = data.name;
        this.houseNo = data.houseNO;
        this.society = data.society;
        this.landMark = data.landmark;
        this.pinCode = data.pincode;
        this.city = data.city;
        this.area = data.area;
      }
    });
  }

  placeOrder() {
    this.purchaseProducts.VendorCode = sessionStorage.getItem('vendorId');
    this.purchaseProducts.SellerId = Number(sessionStorage.getItem('sellerId'));


    // this.purchaseProducts.OrderNo = 'A';
    // this.purchaseProducts.OrderDate = 'A';
    // this.purchaseProducts.DeliveryDate = 'A';
    // this.purchaseProducts.AddressId = 1;
    // this.purchaseProducts.DeliveryType = 'A';
    // this.purchaseProducts.PaymentType = 'A';
    // this.purchaseProducts.DeliveryTime = 'A';

    if (this.purchaseProducts.OrderNo === null || this.purchaseProducts.OrderNo === undefined) {
      this.purchaseProducts.OrderNo = 'NULL';
    }


    if (this.purchaseProducts.DeliveryDate === null || this.purchaseProducts.DeliveryDate === undefined || this.purchaseProducts.DeliveryDate.toString() === '') {

      this.purchaseProducts.DeliveryDate = 'NULL';
    }
    else {

      this.prevDeliveryDate = this.purchaseProducts.DeliveryDate;
      let deliveryDate = this.convertDate(this.purchaseProducts.DeliveryDate);
      this.purchaseProducts.DeliveryDate = deliveryDate;
    }

    if (this.purchaseProducts.DeliveryType === null || this.purchaseProducts.DeliveryType === undefined || this.purchaseProducts.DeliveryType.toString() === '') {
      this.purchaseProducts.DeliveryType = 'NULL';
    }

    if (this.purchaseProducts.PaymentType === null || this.purchaseProducts.PaymentType === undefined || this.purchaseProducts.PaymentType.toString() === '') {
      this.purchaseProducts.PaymentType = 'NULL';
    }

    if (this.purchaseProducts.DeliveryTime === null || this.purchaseProducts.DeliveryTime === undefined || this.purchaseProducts.DeliveryTime.toString() === '') {
      this.purchaseProducts.DeliveryTime = 'NULL';
    }
    this.purchaseProducts.items = JSON.parse(sessionStorage.getItem('cart_items'));

    console.log(this.purchaseProducts);
    this.buyProductsService.savePurchaseProduct(this.purchaseProducts).subscribe(data => {

      this.ProductsResponse = data;
      this.toastr.success('Your Order Is Placed');
      sessionStorage.removeItem('cart_items');
      sessionStorage.removeItem('categoryId');
      sessionStorage.removeItem('address_id');
      this.openDialog();
      this.purchaseProducts.DeliveryDate = this.prevDeliveryDate;
    });

  }

  GoToCart() {
    this.router.navigate(['buyProducts/goToCart']);
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

  getRandomNumbers() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    // return Math.floor(100000 + Math.random() * 900000);
  }


  openDialog() {
    this.dialog.open(DialogOrderNoComponent, {
      height: '150px',
      width: '400px',
      data: this.ProductsResponse
    });
  }


}
