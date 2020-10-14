import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BuyProductsService } from '../buy-products.service';
import { MatPaginator } from '@angular/material/paginator';
import { EmitterService } from 'src/shared/emitter.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, AfterViewInit {

  categoryListData: any = [];
  parentId: string;
  vendorId: string;
  subCategoryListData: any = [];
  groceryArray: any = [];
  sweetMartArray: any = [];
  brandsData: any = [];
  subCategoryId: string;
  selectedSubCategory: any;
  selectedCategory: any = [];
  purchaseProductArray: any = [];
  catchResponse: any = [];
  availableQuantity: boolean = true;
  selectedProductId: any;
  productForm: FormGroup;
  mrp = 0;
  discount = 0;
  finalPrice = 0;

  displayedColumns: string[] = ['name', 'brandname', 'selectVarient', 'mrp', 'discount', 'finalPrice', 'requiredQuantity'];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  requiredQuantity: boolean = false;
  fakeRequiredQuantity: boolean = true;

  constructor(
    public formBuilder: FormBuilder,
    public buyProductsService: BuyProductsService,
    private router: Router,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {

    this.productForm = this.formBuilder.group({
      Quantity: [''],
    });
  }

  ngOnInit(): void {
    this.parentId = '0';
    this.vendorId = sessionStorage.getItem('vendorId');

    this.getCategoryListData();
    // this.getSubCategoryListData();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
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

  getSubCategoryListData() {
    console.log('parent id', this.parentId);
    this.parentId = '3';
    console.log('vendor id', this.vendorId);
    this.buyProductsService.getAllSubCategory(this.parentId, this.vendorId).subscribe(data => {
      this.subCategoryListData = data;
      console.log('sub category ', this.subCategoryListData);
      this.parentId = '0';
    });
  }
  onCategoriesClick(response) {

    console.log(response);
    this.subCategoryId = response.id;
    this.getAllBrandsData();
  }



  getAllBrandsData() {
    console.log('sub cat id', this.subCategoryId);
    console.log('vendorId', this.vendorId);

    this.buyProductsService.getAllProduct(this.subCategoryId, this.vendorId).subscribe(response => {
      this.brandsData = response;
      // this.apiResponseBrandsData = response;
      // mappedData = this.createCustomResponse(this.apiResponseBrandsData, this.storageBrandsData);
      // this.brandsData = mappedData;
      this.dataSource = new MatTableDataSource(this.brandsData);
      this.dataSource.paginator = this.paginator;
      console.log('brands data', this.brandsData);
     
    });
  }


  selectedCategoryFromList(response) {
    console.log('seeletce category', response);
    this.parentId = response.id;

    this.buyProductsService.getAllSubCategory(this.parentId, this.vendorId).subscribe(data => {
      this.subCategoryListData = data;
      console.log('sub category ', this.subCategoryListData);
      this.parentId = '0';
    });
  }

  selectedSubCategoryFromList(response) {
    console.log('seeletce SubCategory', response);
    this.subCategoryId = response.id;
    this.getAllBrandsData();
  }

  selectedVarientFromList(response, i) {



    document.getElementById("mrp" + response.productid).innerHTML = response.productDetails[i].MRP;
    document.getElementById("finalPrice" + response.productid).innerHTML = response.productDetails[i].FinalPrice;
    document.getElementById("discount" + response.productid).innerHTML = response.productDetails[i].Discount;


    // response.productDetails[i].Unit = response.productDetails[i].Unit;
    // document.getElementById("discount" + response.productid)
    // console.log('this is required value', (<HTMLInputElement>document.getElementById("mrp" + response.productid)).innerText);


    this.selectedProductId = response.productid;
    this.availableQuantity = response.productDetails[i].outOfStockFlag;
    console.log('selectedProductId', this.selectedProductId);
    console.log('availableQuantity', this.availableQuantity);
    // console.log(!(this.availableQuantity));


    // document.getElementById("quantity" + response.productid).disabled = this.availableQuantity;
    // document.getElementById("disabledQuantity" + response.productid).
    // if (this.availableQuantity === false) {
    //   this.availableQuantity = false;
    //   this.selectedProductId = 0;  
    // }
    // console.log('selectedProductId', this.selectedProductId);
    // console.log('availableQuantity', this.availableQuantity);
    // this.productForm.controls['quantity'+].disable();


    // console.log('currentQuantity', currentQuantity);
  }


  onQuantityChange(response, quantity, i) {

    if (i === undefined || i === null) {
      i = 0;
    }


    this.purchaseProductArray = JSON.parse(sessionStorage.getItem('cart_items') || '[]');
    if (Number(quantity) > 0) {
      this.catchResponse = this.pushProduct(this.purchaseProductArray, response, i);
      this.purchaseProductArray = this.catchResponse;

      sessionStorage.setItem('cart_items', JSON.stringify(this.purchaseProductArray));
      this.emitterService.isProductIsAddedOrRemoved.emit(true);
    }
    else {
      this.toastr.error('check Quantity');
    }

  }

  pushProduct(arr, response, j) {

    if (j === undefined) {
      j = 0;
    }

    const index = arr.findIndex((o) => o.productid === response.productid && o.id === response.productDetails[j].id);
    if (index === -1) {                 //not exist

      console.log('not exist');
      arr.push({
        brandImageUrl: response.brandImageUrl, imgurl: response.imgurl, name: response.name,
        brandid: response.brandid, productid: response.productid,
        id: response.productDetails[j].id, Unit: response.productDetails[j].Unit, Discount: response.productDetails[j].Discount,
        FinalPrice: response.productDetails[j].FinalPrice, MRP: response.productDetails[j].MRP, Quantity: response.productDetails[j].Quantity,
        RequiredQuantity: response.mappingid
      });

    } else {
      console.log('exist', arr);

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].productid === response.productid && arr[i].id === response.productDetails[j].id) {
          // arr[i].RequiredQuantity = arr[i].RequiredQuantity + response.mappingid;
          arr[i].RequiredQuantity = response.mappingid;
          arr[i].brandImageUrl = response.brandImageUrl;
          arr[i].imgurl = response.imgurl;
          arr[i].name = response.name;
          arr[i].id = response.productDetails[j].id;
          arr[i].Unit = response.productDetails[j].Unit;
          arr[i].Discount = response.productDetails[j].Discount;
          arr[i].FinalPrice = response.productDetails[j].FinalPrice;
          arr[i].MRP = response.productDetails[j].MRP;
          arr[i].Quantity = response.productDetails[j].Quantity
        }
      }
    }
    console.table('unique storage array', arr);
    return arr;
  }


  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
  goCart() {
    this.router.navigate(['/buyProducts/goToCart']);
  }

}
