import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmitterService } from 'src/shared/emitter.service';
import { BuyProductsService } from '../buy-products.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {
  products: any = [];
  subCategoryListData: any = [];
  parentId: string;
  vendorId: string;
  id: any;

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

    this.parentId = this.id;
    this.vendorId = sessionStorage.getItem('vendorId');
    // console.log('vendor id', this.parentId.toString());
    // console.log('parent  id', this.vendorId);

    // this.emitterService.isBrandPreviousClicked.subscribe(value => {
    //   if (value) {
        
    //     this.parentId = sessionStorage.getItem('categoryId');
    //     console.log('parent emitter id', this.parentId );
    //   }
    // });
    
  }

  ngOnInit(): void {
    this.getSubCategoryListData();
  }

  onCardClick(response) {
    this.router.navigate(['buyProducts/brand/' + response.id]);
  }


  getSubCategoryListData() {
    console.log('parent id', this.parentId);
    console.log('vendor id', this.vendorId);
    this.buyProductsService.getAllSubCategory(this.parentId, this.vendorId).subscribe(data => {
      this.subCategoryListData = data;
    });
  }

  goToCategoriesPage() {
    this.router.navigate(['buyProducts/categories']);
  }
}
