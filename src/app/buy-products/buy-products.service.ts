import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuyProductsService {

  private GET_PRODUCT_LIST = 'http://203.112.144.38/AdminApi/api/Product/GetProductList';
  private GET_ALL_CATEGORY_DATA = 'http://203.112.144.38/AdminApi/api/Category/getall';
  private GET_ALL_SUBCATEGORIES_DATA = 'http://203.112.144.38/AdminApi/api/Category/getall';
  private GET_PRODUCT_INFORMATION = 'http://203.112.144.38/AdminApi/api/Product/GetProductInfo';

  constructor(
    public http: HttpClient
  ) { }

  getAllCategory(parentid: string, vendorcode: string) {
    const data = {
      "parentid": parentid,
      "vendorcode": vendorcode
    }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.GET_ALL_CATEGORY_DATA, data, { headers: reqHeader });
  }

  getAllSubCategory(parentid: string, vendorcode: string) {

    const data = {
      "parentid": parentid,
      "vendorcode": vendorcode
    }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.GET_ALL_SUBCATEGORIES_DATA, data, { headers: reqHeader });
  }


  getAllProduct(subcategoryid: string, vendorCode: string) {
    console.log('service subcategoryid', subcategoryid);
    console.log('service vendor id', vendorCode);

    const data = { 'vendorCode': vendorCode, subcategoryid: subcategoryid }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.GET_PRODUCT_LIST, data, { headers: reqHeader });
  }

  getProductInformation(id: string, vendorCode: string) {
    const data = { 'id': id, 'vendorCode': vendorCode }
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.GET_PRODUCT_INFORMATION, data, { headers: reqHeader });
  }

}
