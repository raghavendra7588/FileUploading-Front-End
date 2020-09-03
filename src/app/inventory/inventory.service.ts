import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  name = 'raghu';
  price: any;
  token: string;
  sellerId: string;
  intSellerId: number;
  storageSellerId: number;
  priceListData: any = [];
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];


  private GET_PURCHASE_ORDER_INVENTORY_DATA = 'http://localhost:55547/api/PurchaseReportInventory';

  constructor(public http: HttpClient, public loginService: LoginService) {
    this.token = localStorage.getItem('token');
    this.sellerId = localStorage.getItem('sellerId');
    this.storageSellerId = Number(localStorage.getItem('sellerId'));
  }

  getPurchaseOrderInventoryData(purchaseOrderInventoryData) {
    return this.http.post(this.GET_PURCHASE_ORDER_INVENTORY_DATA, purchaseOrderInventoryData);
  }
}
