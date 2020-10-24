import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmitterService } from 'src/shared/emitter.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems: any = [];
  totalNoOfProducts: number;
  totalProducts: number;
  constructor(
    public loginService: LoginService,
    public router: Router,
    public emitterService: EmitterService) {

    this.emitterService.isProductIsAddedOrRemoved.subscribe(value => {
      if (value) {
        this.cartItems = JSON.parse(sessionStorage.getItem('cart_items'));
        if (this.cartItems === null || this.cartItems === undefined || this.cartItems === [] || this.cartItems === '') {
          this.totalNoOfProducts = 0;
          return;
        }
        else {
          console.log('cart Items', this.cartItems);
          this.totalProducts = this.totalProductsCalculation(this.cartItems);
          this.totalNoOfProducts = this.totalProducts;
          console.log('totalNoOfProducts', this.totalNoOfProducts);
        }
      }
    });
  }

  ngOnInit(): void {
    this.cartItems = JSON.parse(sessionStorage.getItem('cart_items'));
    if (this.cartItems === null || this.cartItems === undefined || this.cartItems === [] || this.cartItems === '') {
      this.totalNoOfProducts = 0;
      return;
    }
    else {
      this.totalProducts = this.totalProductsCalculation(this.cartItems);
      this.totalNoOfProducts = this.totalProducts;
      console.log('totalNoOfProducts', this.totalNoOfProducts);
    }

  }

  totalProductsCalculation(arr) {
    let items = 0;
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        items += Number(arr[i].RequiredQuantity);
      }
      return items;
    }
    else {
      console.log('inside else');
      return items = 0;
    }

  }

  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  goToCategories() {

    // this.router.navigate(['/dashboard']);
    this.router.navigate(['/buyProducts/categories']);
  }

  goToCart() {
    this.router.navigate(['/buyProducts/goToCart']);
  }

  goToAddress() {
    this.router.navigate(['/buyProducts/addressDetailsData']);
  }

  goToMyOrders() {
    this.router.navigate(['/buyProducts/myOrder']);
  }

}
