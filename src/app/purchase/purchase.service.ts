import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { PriceList } from './purchase.model';



@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  name = "raghu";
  price: any;
  token: string;
  sellerId: string;
  intSellerId: number;
  storageSellerId: number;

  priceListData: any = [];
  // sellerId: any;
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];


  private GET_ALL_ADDRESSS_DATA = 'http://localhost:55547/api/Address';
  private SAVE_VENDOR_MASTER = 'http://localhost:55547/api/Vendor';
  private GET_SUBCATEGORIES = 'http://203.112.144.38/AdminApi/api/Category/getall';
  private GET_BRANDS = 'http://203.112.144.38/AdminApi/api//ProductSellerMapping/getalledit';
  private GET_ALL_VENDOR_DATA = 'http://localhost:55547/api/Vendor';
  private SAVE_ADDRESS_MASTER = 'http://localhost:55547/api/address';
  private SAVE_PRICE_LIST = 'http://localhost:55547/api/PriceList';
  private SAVE_MULTIPLE_PRICE_LIST = 'http://localhost:55547/api/PriceList/multiple';
  private GET_ALL_PRICELIST_DATA = 'http://localhost:55547/api/PriceList';

  constructor(public http: HttpClient, public loginService: LoginService) {
    this.token = localStorage.getItem('token');
    this.sellerId = localStorage.getItem('sellerId');
    this.storageSellerId = Number(localStorage.getItem('sellerId'));
  }


  getAllSubCategories(parentid) {
    const data = { 'parentid': parentid }
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_SUBCATEGORIES, data, { headers: reqHeader });
  }



  getAllBrand(parenetid: any, SubCategoryId: string) {
    const data = { "SellerId": this.sellerId, "CategoryId": parenetid, "SubCategoryId": SubCategoryId }
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_BRANDS, data, { headers: reqHeader });
  }

  getEveryBrand() {
    const data = { "SellerId": this.sellerId, "CategoryId": "0", "SubCategoryId": "0" }
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post(this.GET_BRANDS, data, { headers: reqHeader });
  }

  getAddressData() {
    return this.http.get(this.GET_ALL_ADDRESSS_DATA + '/' + this.storageSellerId);
  }

  saveVendorMaster(vendorData: any) {
    return this.http.post(this.SAVE_VENDOR_MASTER, vendorData);
  }

  getAllVendorData() {
    return this.http.get(this.GET_ALL_VENDOR_DATA + '/' + this.sellerId);
  }

  saveAddressMaster(addressData) {
    return this.http.post(this.SAVE_ADDRESS_MASTER, addressData);
  }

  savePriceListMaster(priceListData) {
    return this.http.post(this.SAVE_PRICE_LIST, priceListData);
  }

  saveMultiplePriceList(priceListData) {
    return this.http.post(this.SAVE_MULTIPLE_PRICE_LIST, priceListData);
  }

  getAllPriceListData(sellerId: number) {
    return this.http.get(this.GET_ALL_PRICELIST_DATA + '/' + sellerId);
  }

  getPriceListData(sellerId: number) {
    // this.getAllPriceListData(this.storageSellerId).subscribe(data => {
    //   this.priceListData = data;
    //   console.log('received Price List Data', this.priceListData);
    // });
    this.http.get(this.GET_ALL_PRICELIST_DATA + '/' + sellerId).subscribe(data => {
      this.priceListData = data;
    });

    return this.priceListData;
  }

  getBrandsMasterData() {
    this.getEveryBrand().subscribe(data => {
      this.masterBrandData = data;
      console.log('master Data', this.masterBrandData);
      this.extractPriceListData = this.extractPriceList(this.masterBrandData, this.priceListData);
      this.finalPriceList = this.mapObj(this.extractPriceListData, this.priceListData);
      console.log('APPEND THIS TO GRID', this.finalPriceList);
    });
    return this.finalPriceList;
  }

  extractPriceList(apiData, ownDbData) {

    let result = apiData.filter(o1 => ownDbData.some(o2 => o1.ProductID === o2.ProductId && o1.ProductVarientId === o2.ProductVarientId));

    
    return result;
  }


  mapObj(apiData, ownDbData) {
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].ProductPrice = 0;
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
          apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].FinalPrice = ownDbData[j].FinalPrice;
        }
      }
    }
    return apiData;
  }

}