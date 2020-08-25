import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { LoginService } from './login.service'
import { PurchaseService } from '../purchase/purchase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  constructor(public router: Router, public loginService: LoginService, public purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.user.username = '9821163016';
    this.user.password = '123456';
    this.getMasterBrandData();
  }


  login() {
    this.loginService.loginUser(this.user).subscribe(data => {
      this.loginService.seller_object = data;
      this.loginService.seller_token = data.token;
      this.loginService.seller_mapped_categories = data.categories;
      this.loginService.seller_id = data.id;
      this.loginService.seller_name = data.name;
      localStorage.setItem('token', data.token);
      localStorage.setItem('sellerName', data.name);
      localStorage.setItem('sellerId', data.id.toString());
      localStorage.setItem('categories', JSON.stringify(data.categories));

      this.router.navigate(['/dashboard']);
    });
  }

  
  getMasterBrandData() {
    this.purchaseService.getEveryBrand().subscribe(data => {
    
      this.purchaseService.masterBrandData = data;

    });
  }


}
