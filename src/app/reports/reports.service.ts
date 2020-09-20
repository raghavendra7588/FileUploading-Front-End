import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {


  // private BASE_URL = 'http://203.112.144.38/uat_InventoryService/';
  private BASE_URL = 'http://localhost:55547/';

  private GET_Minimum_PurchaseOrder_DATA = this.BASE_URL + 'api/MinimumPurchaseReportInventory';


  constructor(public http: HttpClient) { }

  getAllMinimumPurchaseData(PurchaseOrder) {
    return this.http.post(this.GET_Minimum_PurchaseOrder_DATA, PurchaseOrder);
  }

  getMinimumPurchaseDataById(id) {
    return this.http.get(this.GET_Minimum_PurchaseOrder_DATA + '/' + id);
  }

}
