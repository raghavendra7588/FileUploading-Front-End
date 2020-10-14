import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmitterService } from 'src/shared/emitter.service';
import { BuyProductsService } from '../buy-products.service';
import { ToastrService } from 'ngx-toastr';
import { createInject } from '@angular/compiler/src/core';
import { toArray } from 'lodash';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  apiResponseBrandsData: any = [];
  storageBrandsData: any = [];
  brandsData: any = [];
  vendorId: string;
  subCategoryId: string;
  id: any;
  categoryId: string;
  purchaseQuantity: number = 0;
  finalPrice: number = 0;
  mrp: number = 0;
  discount: number = 0;
  availableQuantity: boolean;
  purchaseProductArray: any = [];
  selectedProductId: any;
  selectedId: any;
  editIValue: any;
  editedJValue: any;
  qtd: any;
  currentValue: any = 0;
  catchResponse: any = [];
  itemValue: any;

  constructor(
    public buyProductsService: BuyProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public emitterService: EmitterService,
    public toastr: ToastrService
  ) {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );

    this.subCategoryId = this.id;
    this.vendorId = sessionStorage.getItem('vendorId');

  }

  ngOnInit(): void {
    this.storageBrandsData = JSON.parse(sessionStorage.getItem('cart_items') || '[]');
    this.getAllBrandsData();
  }

  getAllBrandsData() {
    let mappedData: any = [];
    this.buyProductsService.getAllProduct(this.subCategoryId, this.vendorId).subscribe(response => {
      this.brandsData = response;
      this.apiResponseBrandsData = response;
      mappedData = this.createCustomResponse(this.apiResponseBrandsData, this.storageBrandsData);
      console.log('we got mapped', mappedData);
      // this.brandsData = mappedData;


      console.log('all brands data &&&&&&&&&&&&&&&', this.brandsData);
    });
  }

  goToSubCategoriesPage() {
    // this.emitterService.isBrandPreviousClicked.emit(true);
    this.categoryId = sessionStorage.getItem('categoryId').toString();
    this.router.navigate(['buyProducts/SubCategories/' + this.categoryId]);
  }

  brandsInformation(response) {
    // console.log('i clicked on image', response);
    this.router.navigate(['buyProducts/productInformation/' + response.productid]);
  }

  selectedVarientFromList(response, i, j) {
    console.log('i clicked on this', response);
    console.log('i', i);
    console.log('j', j);

    response.mappingid = 0;
    this.editIValue = i;
    this.editedJValue = j;

    // console.log('I', this.editIValue);
    // console.log('J', this.editedJValue);

    document.getElementById("mrp" + i).innerHTML = response.productDetails[j].MRP;
    document.getElementById("finalPrice" + i).innerHTML = response.productDetails[j].FinalPrice;
    document.getElementById("discount" + i).innerHTML = response.productDetails[j].Discount;
    this.selectedProductId = response.productDetails[j].productid;
    this.availableQuantity = response.productDetails[j].outOfStockFlag;
  }




  decrementQuantity(response, i) {
    let currentQuantityValue: any;
    console.log('response', response);
    console.log('response', i);
    currentQuantityValue = Number((document.getElementById("qunatity" + i) as HTMLInputElement).value);
    if (currentQuantityValue > 0) {
      currentQuantityValue -= 1;

      document.getElementById("qunatity" + i).innerHTML = currentQuantityValue;
      response.mappingid = currentQuantityValue;
    }
    else {
      this.toastr.error('Check Quantity');
      return;
    }
    // console.log('after manipultn response', response);

  }

  incrementQuantity(response, i) {
    let currentQuantity: any;
    currentQuantity = Number((document.getElementById("mrp" + i) as HTMLInputElement).value);
    currentQuantity += 1;
    document.getElementById("mrp" + i).innerHTML = currentQuantity;
    response.mappingid = currentQuantity;

    // console.log('after manipultn response', response);
  }



  addProducts(response, i, j) {

    console.log('i', i);
    if (j === undefined) {
      j = 0;
    }
    console.log('j', j);

    //this.purchaseProductArray = JSON.parse(localStorage.getItem('cart_items'));
    // console.log('focus out called', this.purchaseProductArray);
    // if (JSON.parse(localStorage.getItem('cart_items')) === null) {
    //   this.purchaseProductArray = [];
    // }
    // else {
    //   this.purchaseProductArray = JSON.parse(localStorage.getItem('cart_items'));
    // }
    this.purchaseProductArray = JSON.parse(sessionStorage.getItem('cart_items') || '[]');
    // console.log(JSON.parse(sessionStorage.getItem('cart_items')));

    // console.log('purchaseProductArray', this.purchaseProductAr1ray);
    this.catchResponse = this.pushProduct(this.purchaseProductArray, response, this.editedJValue);
    this.purchaseProductArray = this.catchResponse;

    sessionStorage.setItem('cart_items', JSON.stringify(this.purchaseProductArray));
    this.emitterService.isProductIsAddedOrRemoved.emit(true);
  }



  pushProduct(arr, response, j) {


    console.log('arr', arr);
    console.log('response obj', response);

    if (j === undefined) {
      j = 0;
    }
    console.log('j', j);



    const index = arr.findIndex((o) => o.productid === response.productid && o.id === response.productDetails[j].id);
    if (index === -1) {                 //not exist

      console.log('not exist');
      arr.push({
        brandImageUrl: response.brandImageUrl, imgurl: response.imgurl, name: response.name,
        brandid: response.brandid, productid: response.productid,
        id: response.productDetails[j].id, Unit: response.productDetails[j].Unit, Discount: response.productDetails[j].Discount,
        FinalPrice: response.productDetails[j].FinalPrice, MRP: response.productDetails[j].MRP, Quantity: response.productDetails[j].Quantity,
        RequiredQuantity: response.mappingid
      });

    } else {
      console.log('exist', arr);

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].productid === response.productid && arr[i].id === response.productDetails[j].id) {
          // arr[i].RequiredQuantity = arr[i].RequiredQuantity + response.mappingid;
          arr[i].RequiredQuantity = response.mappingid;
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
      // let data = {
      //   brandImageUrl: response.brandImageUrl, imgurl: response.imgurl, name: response.name,
      //   brandid: response.brandid, productid: response.productid,
      //   id: response.productDetails[j].id, Unit: response.productDetails[j].Unit, Discount: response.productDetails[j].Discount,
      //   FinalPrice: response.productDetails[j].FinalPrice, MRP: response.productDetails[j].MRP,
      //   Quantity: response.productDetails[j].Quantity,
      //   RequiredQuantity: response.mappingid
      // };                      //exist
      // arr[index] = data;
    }
    console.table('unique storage array', arr);
    return arr;
  }


  createCustomResponse(apiData, storageData) {
    console.log('api data', apiData);
    console.log('storage data', storageData);

    for (let i = 0; i < apiData.length; i++) {
      // apiData[i].productDetails[i].PriceDecisionFactorName = "0";
      // console.log( apiData[i].productDetails[i].PriceDecisionFactorName);
      for (let j = 0; j < storageData.length; j++) {
        if (apiData.productDetails[i].productid === storageData[j].productid && apiData.productDetails[i].id === storageData[j].id) {
          console.log('cndn match');
          apiData[i].mappingid = storageData[j].RequiredQuantity;
        }
      }
    }
    console.log('custom response **:', apiData);
    return apiData;
  }

  goToCart() {
    this.router.navigate(['buyProducts/goToCart']);
  }
}

