import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmitterService } from 'src/shared/emitter.service';
import { BuyProductsService } from '../buy-products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brandsData: any = [];
  vendorId: string;
  subCategoryId: string;
  id: any;
  categoryId: string;

  constructor(
    public buyProductsService: BuyProductsService,
    public router: Router,
    public route: ActivatedRoute,
    public emitterService: EmitterService
  ) {

    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );

    this.subCategoryId = this.id;
    this.vendorId = sessionStorage.getItem('vendorId');
    //console.log('vendor id', this.parentId.toString());
    // console.log('vendor  id', this.vendorId);
    // console.log('subCategory  id', this.subCategoryId);
    this.getAllBrandsData();
  }

  ngOnInit(): void {
  }

  getAllBrandsData() {
    this.buyProductsService.getAllProduct(this.subCategoryId, this.vendorId).subscribe(response => {
      this.brandsData = response;
      console.log('all brands', this.brandsData);
    });
  }

  goToSubCategoriesPage() {
    // this.emitterService.isBrandPreviousClicked.emit(true);
    this.categoryId = sessionStorage.getItem('categoryId').toString();
    this.router.navigate(['buyProducts/SubCategories/' + this.categoryId]);
  }

  brandsInformation(response) {
    console.log('i clicked on image', response);
    this.router.navigate(['buyProducts/productInformation/' + response.productid]);
  }
}
