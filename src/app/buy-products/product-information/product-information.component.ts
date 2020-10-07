import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuyProductsService } from '../buy-products.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit {

  productId: string;
  vendorCode: string;
  productInformation: any = [];

  constructor(
    public buyProductsService: BuyProductsService,
    public router: Router,
    public route: ActivatedRoute
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
    this.buyProductsService.getProductInformation(this.productId, this.vendorCode).subscribe(response => {
      console.log('received product info', response);
      this.productInformation = response;
    });
  }
}
