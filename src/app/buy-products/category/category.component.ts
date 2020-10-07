import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyProductsService } from '../buy-products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryListData: any = [];
  parentId: string;
  vendorId: string;

  constructor(
    public buyProductsService: BuyProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.parentId = '0';
    this.vendorId = sessionStorage.getItem('vendorId');
    console.log('vendor id', this.vendorId);
    this.getCategoryListData();
  }

  onCardClick(category) {
    console.log('i received the category', category);
    this.router.navigate(['buyProducts/SubCategories/' + category.id]);
    sessionStorage.setItem('categoryId', category.id);
  }

  getCategoryListData() {
    this.buyProductsService.getAllCategory(this.parentId, this.vendorId).subscribe(data => {
      console.log('category list', data);
      this.categoryListData = data;
    });

  }
}
