import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyProductsService } from '../buy-products.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {

  categoryListData: any = [];
  categoryParentId: string;
  categoryVendorId: string;

  isCategory: string;
  isSubCategory: string;
  isBrandWise: string;
  isProductWise: string;
  isProductInformationWise: string;
  isCart: string;

  products: any = [];
  subCategoryListData: any = [];
  subCategoryParentId: string;
  subCategoryVendorId: string;
  id: any;

  productWisebrandsData: any = [];
  productWiseVendorId: string;
  productWiseSubCategoryId: string;


  constructor(
    public buyProductsService: BuyProductsService,
    private router: Router
  ) {
    this.isCategory = sessionStorage.getItem('isCategory'); 
    this.isSubCategory = sessionStorage.getItem('isSubCategory');
    this.isBrandWise = sessionStorage.getItem('isBrandWise');
    this.isProductWise = sessionStorage.getItem('isProductWise');
    this.isProductInformationWise = sessionStorage.getItem('isProductInformationWise');
    this.isCart = sessionStorage.getItem('isCart');
  }

  ngOnInit(): void {
    this.categoryParentId = '0';
    this.categoryVendorId = sessionStorage.getItem('vendorId');
    this.subCategoryVendorId = sessionStorage.getItem('vendorId');
    this.productWiseVendorId = sessionStorage.getItem('vendorId');
    this.getCategoryListData();
  }

  //category
  onCardClick(category) {
    // this.isSubCategory = true;
    // this.isCategory = false;
    sessionStorage.setItem('isSubCategory', 'true');
    this.isSubCategory = sessionStorage.getItem('isSubCategory');

    sessionStorage.setItem('isCategory', 'false');
    this.isCategory = sessionStorage.getItem('isCategory');
    this.subCategoryParentId = category.id;
    this.getSubCategoryListData(this.subCategoryParentId, this.subCategoryVendorId);
  }


  getCategoryListData() {
    this.buyProductsService.getAllCategory(this.categoryParentId, this.categoryVendorId).subscribe(data => {
      this.categoryListData = data;
    });
  }


  //sub Category
  getSubCategoryListData(subCategoryParentId, subCategoryVendorId) {
    this.buyProductsService.getAllSubCategory(subCategoryParentId, subCategoryVendorId).subscribe(data => {
      this.subCategoryListData = data;
    });
  }

  onSubCategoryClick(response) {
    this.productWiseSubCategoryId = response.id;
    // this.isSubCategory = false;
    // this.isCategory = false;
    // this.isProductWise = true;
    this.getAllBrandsData(this.productWiseSubCategoryId, this.productWiseVendorId);
  }

  goToCategoriesPage() {
    // this.isCategory = true;
    // this.isSubCategory = false;

    // sessionStorage.setItem('isSubCategory', 'false');
    // this.isSubCategory = sessionStorage.getItem('isSubCategory');

    // sessionStorage.setItem('isCategory', 'true');
    // this.isCategory = sessionStorage.getItem('isCategory');
  }


  //productWise Brands

  getAllBrandsData(subCategoryId, vendorId) {
    this.buyProductsService.getAllProduct(subCategoryId, vendorId).subscribe(response => {
      this.productWisebrandsData = response;
      console.log('all brands', this.productWisebrandsData);
    });
  }

  goToSubCategoriesPage() {
    // this.isSubCategory = true;
    // this.isCategory = false;
    // this.isProductWise = false;
  }

  brandsInformation(response) {
    console.log('i clicked on image', response);
    this.router.navigate(['buyProducts/productInformation/' + response.productid]);
  }
}
