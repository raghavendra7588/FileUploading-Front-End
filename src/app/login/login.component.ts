import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { LoginService } from './login.service'
import { PurchaseService } from '../purchase/purchase.service';
import { EmitterService } from 'src/shared/emitter.service';
import { InventoryService } from '../inventory/inventory.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  constructor(
    public router: Router,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.user.username = '9821163016';
    this.user.password = '100100';
    this.getMasterBrandData();
  }


  login() {
    this.loginService.loginUser(this.user).subscribe(data => {
      this.loginService.seller_object = data;
      this.loginService.seller_token = data.token;
      this.loginService.seller_mapped_categories = data.categories;
      this.loginService.seller_id = data.id;
      this.loginService.seller_name = data.name;
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('sellerName', data.name);
      sessionStorage.setItem('sellerId', data.id.toString());
      sessionStorage.setItem('categories', JSON.stringify(data.categories));
      sessionStorage.setItem('vendorId', data.vendorcode.toString());
      // this.emitterService.isLoginResponse.emit(data);
      this.purchaseService.storageSellerId = Number(data.id);
      this.purchaseService.sellerId = data.id;
      this.inventoryService.sellerId = data.id;
      this.router.navigate(['/dashboard']);
    });
  }


  getMasterBrandData() {
    this.purchaseService.getEveryBrand().subscribe(data => {

      this.purchaseService.masterBrandData = data;

    });
  }


}
