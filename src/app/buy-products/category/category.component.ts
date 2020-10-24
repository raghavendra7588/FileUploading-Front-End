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
  patientCategory: FormGroup;

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
  selectedBrands: any;
  purchaseProductArray: any = [];
  catchResponse: any = [];
  availableQuantity: any;
  selectedProductId: any;
  productForm: FormGroup;
  mrp = 0;
  discount = 0;
  finalPrice = 0;
  uniqueBrandNamesArray: any = [];
  catchBrandArray: any = [];
  productsArray: any = [];
  totalNoOfProducts: number;
  totalProducts: number;
  showInitialProductDetails: boolean;
  finalProductDetails: boolean;
  selectedValue: any;

  displayedColumns: string[] = ['name', 'brandname', 'selectVarient', 'mrp',
    'discount', 'finalPrice', 'requiredQuantity', 'add'];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  requiredQuantity: boolean = false;
  fakeRequiredQuantity: boolean = true;
  categoryIdArray: any = [];
  uniqueCategoriesArray: any = [];
  cartItems: any = [];
  selectedIndex: number;
  allBrandsData: any = [];
  allSubCategoryData: any = [];
  sellerId: string;
  categoryId: string;
  SubCategoryId: string;


  constructor(
    public formBuilder: FormBuilder,
    public buyProductsService: BuyProductsService,
    private router: Router,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.parentId = '0';
    this.vendorId = sessionStorage.getItem('vendorId');
    this.sellerId = (sessionStorage.getItem('sellerId')).toString();
    this.patientCategory = this.fb.group({
      patientCategory: [null, Validators.required]
    });

    this.showInitialProductDetails = true;
    this.finalProductDetails = false;
    this.cartItems = JSON.parse(sessionStorage.getItem('cart_items'));
    // console.log('cart Items', cartItems);


    if (this.cartItems === null || this.cartItems === undefined || this.cartItems === []) {
      // console.log('no items in cart');
      return;
    }
    else {
      // console.log('items are present in cart');
      for (let i = 0; i < this.cartItems.length; i++) {
        this.categoryIdArray.push(this.cartItems[i].categoryid);
      }

      // console.log('categoryIdArray', this.categoryIdArray);
      this.uniqueCategoriesArray = [... new Set(this.categoryIdArray)];
      let numberArray = this.uniqueCategoriesArray.map(Number);
      this.uniqueCategoriesArray = numberArray;
      console.log('unique', this.uniqueCategoriesArray);
      this.totalProductsCalculation(this.cartItems);
    }





    // this.emitterService.isProductIsAddedOrRemoved.subscribe(value => {
    //   if (value) {
    //     this.cartItems = JSON.parse(sessionStorage.getItem('cart_items'));
    //     if (this.cartItems === null || this.cartItems === undefined || this.cartItems === [] || this.cartItems === '') {
    //       this.totalNoOfProducts = 0;
    //       console.log('cart is blank', this.totalNoOfProducts);
    //       return;
    //     }
    //     else {
    //       console.log('cart Items', this.cartItems);
    //       this.totalProducts = this.totalProductsCalculation(this.cartItems);
    //       this.totalNoOfProducts = this.totalProducts;
    //       console.log('totalNoOfProducts', this.totalNoOfProducts);
    //     }
    //   }
    // });


  }

  ngOnInit(): void {

    this.buyProductsService.getAllCategory(this.parentId, this.vendorId).subscribe(data => {

      this.categoryListData = data;
      console.log(' ***** category list ******', this.categoryListData);
      this.checkCartItems(this.categoryListData);
    });
    // this.getCategoryListData();
    // this.getSubCategoryListData();

    // if (!(this.cartItems === null || this.cartItems === undefined || this.cartItems === [])) {
    // console.log('no items in cart');
    // return;}

    // }
  }
  totalProductsCalculation(arr) {
    let items = 0;
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        items += Number(arr[i].RequiredQuantity);
      }
      this.totalNoOfProducts = items;
      return items;
    }
    else {
      console.log('inside else');
      this.totalNoOfProducts = 0;
      return items = 0;
    }

  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator
  }

  checkCartItems(arr) {
    console.log('recieved cart items', arr);
    // console.log(' ***', this.categoryListData);
    if ((this.cartItems === null || this.cartItems === undefined || this.cartItems === [])) {

      this.categoryListData;
      return;
    }
    else {
      let particularCategories: any = [];
      // console.log('this.uniqueCategoriesArray', this.uniqueCategoriesArray);
      this.categoryListData = [];
      arr.filter(item => {
        // console.log('item', item);
        if (this.uniqueCategoriesArray.includes(Number(item.id))) {
          // console.log('required category response', item);
          particularCategories = item;
          // this.categoryListData = [];
          this.categoryListData.push(particularCategories);
          // particularCategory = item;
          // this.particularCategoryArray.push(particularCategory);
        }

      });
    }

    console.log('after manipultn this.categoryListData', this.categoryListData);
  }


  onCardClick(category) {
    // console.log('i received the category', category);
    this.router.navigate(['buyProducts/SubCategories/' + category.id]);
    sessionStorage.setItem('categoryId', category.id);
  }

  getCategoryListData() {
    this.buyProductsService.getAllCategory(this.parentId, this.vendorId).subscribe(data => {
      // console.log('category list', data);
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
    let uniqueBrandNames: any = [];
    this.buyProductsService.getAllProduct(this.subCategoryId, this.vendorId).subscribe(response => {
      this.brandsData = response;
      this.catchBrandArray = response;
      // this.apiResponseBrandsData = response;
      // mappedData = this.createCustomResponse(this.apiResponseBrandsData, this.storageBrandsData);
      // this.brandsData = mappedData;
      // element.productDetails[0].Unit

      this.dataSource = new MatTableDataSource(this.brandsData);
      this.dataSource.paginator = this.paginator;

      console.log('brands data', this.brandsData);
      uniqueBrandNames = this.createUniqueBrandName(this.brandsData);
      this.uniqueBrandNamesArray = this.sortUniqueBrandName(uniqueBrandNames);
      console.log('unique brand names', this.uniqueBrandNamesArray);

    });
  }


  selectedCategoryFromList(response) {
    // console.log('seeletce category', response);
    this.parentId = response.id;

    this.buyProductsService.getAllSubCategory(this.parentId, this.vendorId).subscribe(data => {
      this.subCategoryListData = data;
      // console.log('sub category ', this.subCategoryListData);
      this.parentId = '0';
    });
  }

  selectedSubCategoryFromList(response) {
    // console.log('seeletce SubCategory', response);
    this.subCategoryId = response.id;
    this.getAllBrandsData();
    // this.selectedValue = this.catchBrandArray.productDetails[0].Unit;
    // const toSelect = this.catchBrandArray.find(c =>console.log('ccccc',c));
    // this.patientCategory.get('patientCategory').setValue(toSelect);
  }

  selectedBrandFromList(response) {
    // console.log('selected brands from list', response);
    let filteredBrandArray = this.catchBrandArray.filter(function (item) {
      return item.brandname.trim() === response.brandname.trim() && item.brandid === response.brandid;
    });
    this.productsArray = filteredBrandArray;
    this.dataSource = new MatTableDataSource(this.productsArray);
    this.dataSource.paginator = this.paginator;
  }

  selectedVarientFromList(response, i) {
    this.availableQuantity = 'False';
    console.log('intially availableQuantity', this.availableQuantity);
    // console.log('select list changed', i);
    console.log(' response.productDetails', response.productDetails);
    console.log(' response.productDetails', response.productDetails[i]);
    // response.productDetails.filter(item=>{
    //   console.log('3 items',item);
    // });
    this.selectedIndex = i;
    console.log('selectedIndex', this.selectedIndex);

    document.getElementById("mrp" + response.productid).innerHTML = response.productDetails[i].MRP;
    document.getElementById("finalPrice" + response.productid).innerHTML = response.productDetails[i].FinalPrice;
    document.getElementById("discount" + response.productid).innerHTML = response.productDetails[i].Discount;
    this.showInitialProductDetails = false;
    this.finalProductDetails = true;

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
    console.log('i ', i);
    console.log();

    if (this.selectedIndex === undefined || this.selectedIndex === null) {
      i = 0;
    }
    if (this.availableQuantity === 'True') {
      this.toastr.error('Currently this Product is Out of Stock');
      return;
    }
    // console.log('i will not execute after Out of Stock');
    this.purchaseProductArray = JSON.parse(sessionStorage.getItem('cart_items') || '[]');
    console.log('session array', this.purchaseProductArray);
    console.log('response ', response);
    // if ((this.purchaseProductArray != null || this.purchaseProductArray != undefined || this.purchaseProductArray != [])) {
    //   if (Number(this.purchaseProductArray[0].categoryid) != Number(response.categoryid)) {
    //     this.toastr.error('Can not allowed to add more one categories product');
    //     return;
    //   }
    // }

    if ("cart_items" in sessionStorage) {
      if (Number(this.purchaseProductArray[0].categoryid) != Number(response.categoryid)) {
        this.toastr.error('Can not allowed to add more one categories product');
        return;
      }

    } else {
      console.log("");
    }

    if (Number(quantity) > 0) {
      // this.catchResponse = this.pushProduct(this.purchaseProductArray, response, i);
      this.catchResponse = this.pushProduct(this.purchaseProductArray, response, this.selectedIndex);
      this.purchaseProductArray = this.catchResponse;

      sessionStorage.setItem('cart_items', JSON.stringify(this.purchaseProductArray));
      this.toastr.success('Product is Added Into Cart');
      this.totalProductsCalculation(this.purchaseProductArray);
      this.emitterService.isProductIsAddedOrRemoved.emit(true);
    }
    else {
      this.toastr.error('check Quantity');
    }

  }

  pushProduct(arr, response, j) {
    console.log('response', response);
    console.log('arr', arr);
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
        RequiredQuantity: response.mappingid, categoryid: response.categoryid
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
          arr[i].categoryid = response.categoryid
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


  createUniqueBrandName(array: any) {
    console.log('inside fun ', array);
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.brandname.trim() == array[i].brandname.trim())) == -1) {
        var item = {
          brandname: array[i].brandname.trim(), subcategoryid: array[i].subcategoryid, brandid: array[i].brandid,
          productid: array[i].productid
        }
        sortedArray.push(item);
      }
    }
    return sortedArray;
  }


  sortUniqueBrandName(array) {
    array.sort((a, b) => {
      return a.brandname.localeCompare(b.brandname);
    });
    return array
  }

  onBrandSelectAll() {
    this.categoryId = "0";
    this.SubCategoryId = "0";
    this.buyProductsService.getALLBrandsData(this.sellerId, this.categoryId, this.SubCategoryId).subscribe(response => {
      this.allBrandsData = response;
      console.log('all brands ', this.allBrandsData);
      this.dataSource = new MatTableDataSource(this.allBrandsData);
      this.dataSource.paginator = this.paginator;
    });
  }

}
