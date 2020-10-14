import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuyProductsService } from '../buy-products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {

  productId: string;
  vendorCode: string;
  productInformation: any = [];
  purchaseQuantity: number = 0;
  finalPrice: number = 0;
  mrp: number = 0;
  discount: number = 0;
  availableQuantity: boolean;
  isMeasureMentUnitSelected: boolean = true;
  editedJValue: any;
  purchaseProductArray: any = [];
  catchResponse: any = [];

  constructor(
    public buyProductsService: BuyProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService
  ) {


    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id'];
      }
    );

    this.vendorCode = sessionStorage.getItem('vendorId');
    this.getProductInformation();
  }

  ngOnInit(): void {
  }

  getProductInformation() {
    let arrayResponse: any = [];
    let customResponse: any = [];
    this.buyProductsService.getProductInformation(this.productId, this.vendorCode).subscribe(response => {
      console.log('received product info', response);

      arrayResponse.push(response);
      customResponse = this.customResponseArray(arrayResponse);
      this.productInformation = customResponse;
    });
  }
  customResponseArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].mappingid = 0;
    }
    return arr;
  }

  decrementQuantity(response, i, j) {
    console.log(' inc RESPONSE', response);
    console.log(' inc i', i);
    console.log(' inc j', j);
    if (this.purchaseQuantity > 0) {
      this.purchaseQuantity = this.purchaseQuantity - 1;
    }
    if (this.purchaseQuantity === 0) {
      // this.purchaseQuantity = 0;
      this.toastr.error('Check Quantity');
      return;
    }

    // console.log('purchaseQuantity', this.purchaseQuantity);

  }

  incrementQuantity(response, i, j) {
    console.log(' inc RESPONSE', response);
    // console.log(' inc i', i);
    // console.log(' inc j', j);
    let currentQuantity: any;
    currentQuantity = Number((document.getElementById("quantity") as HTMLInputElement).value);
    console.log('currentQuant', currentQuantity);
    currentQuantity += 1;
    document.getElementById("quantity").innerHTML = currentQuantity;
    response.mappingid = currentQuantity;
    console.log('after mani ', response);
    // this.purchaseQuantity = this.purchaseQuantity + 1;
    // console.log('purchaseQuantity', this.purchaseQuantity);
  }

  selectMeasurementUnit(response, j) {
    this.editedJValue = j;
    this.purchaseQuantity = 0;
    // console.log('selected ', this.editedJValue);
    this.mrp = response.MRP;
    this.finalPrice = response.FinalPrice;
    this.discount = response.Discount;
    this.availableQuantity = response.outOfStockFlag;
    this.isMeasureMentUnitSelected = false;
  }

  // subcategoryid
  goToProductWiseBrandPage() {
    this.router.navigate(['buyProducts/brand/' + this.productInformation.subcategoryid]);
  }


  addProducts() {
    let storageArray: any = [];
    this.purchaseProductArray = JSON.parse(sessionStorage.getItem('cart_items') || '[]');
    // console.log(JSON.parse(sessionStorage.getItem('cart_items')));

    console.log('purchaseProductArray', this.purchaseProductArray);
    this.catchResponse = this.pushProduct(this.purchaseProductArray, this.productInformation, this.editedJValue);
    this.purchaseProductArray = this.catchResponse;

    sessionStorage.setItem('cart_items', JSON.stringify(this.purchaseProductArray));

  }

  pushProduct(arr, response, j) {


    console.log('arr', arr);
    console.log('response obj', response);
    if (j === undefined) {
      j = 0;
    }
    console.log('j', j);
    // console.log('quantity', this.purchaseQuantity);


    const index = arr.findIndex((o) => o.productid === response[0].productid && o.id === response[0].productDetails[j].id);
    console.log('index ', index);
    if (index === -1) {                 //not exist

      console.log('not exist');
      arr.push({
        brandImageUrl: response[0].brandImageUrl, imgurl: response[0].imgurl, name: response[0].name,
        brandid: response[0].brandid, productid: response[0].productid,
        id: response[0].productDetails[j].id, Unit: response[0].productDetails[j].Unit, Discount: response[0].productDetails[j].Discount,
        FinalPrice: response[0].productDetails[j].FinalPrice, MRP: response[0].productDetails[j].MRP, Quantity: response[0].productDetails[j].Quantity,
        RequiredQuantity: response[0].mappingid
      });

    }
    else {
      console.log('exist', arr);
      let prevQuantity: any;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].productid === response.productid && arr[i].id === response.productDetails[j].id) {
          prevQuantity = arr[i].RequiredQuantity;
          // arr[i].RequiredQuantity = arr[i].RequiredQuantity + this.purchaseQuantity;
          arr[i].RequiredQuantity = response[j].mappingid;
          arr[i].brandImageUrl = response.brandImageUrl;
          arr[i].imgurl = response.imgurl;
          arr[i].name = response.name;
          arr[i].id = response.productDetails[j].id;
          arr[i].Unit = response.productDetails[j].Unit;
          arr[i].Discount = response.productDetails[j].Discount;
          arr[i].FinalPrice = response.productDetails[j].FinalPrice;
          arr[i].MRP = response.productDetails[j].MRP;
          arr[i].Quantity = response.productDetails[j].Quantity
        }
      }
      console.log('prev quaant', prevQuantity);
      let data = {
        brandImageUrl: response.brandImageUrl, imgurl: response.imgurl, name: response.name,
        brandid: response.brandid, productid: response.productid,
        id: response.productDetails[j].id, Unit: response.productDetails[j].Unit, Discount: response.productDetails[j].Discount,
        FinalPrice: response.productDetails[j].FinalPrice, MRP: response.productDetails[j].MRP,
        Quantity: response.productDetails[j].Quantity,
        // RequiredQuantity: this.purchaseQuantity + prevQuantity
        RequiredQuantity: response[j].mappingid
      };                      //exist
      arr[index] = data;
    }
    console.table('unique storage array', arr);
    return arr;
  }


}
