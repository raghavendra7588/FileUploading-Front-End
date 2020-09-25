import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PurchaseOrderItem, PriceList } from 'src/app/purchase/purchase.model';
import { PurchaseService } from 'src/app/purchase/purchase.service';
import { MatSort } from '@angular/material/sort';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSelect } from '@angular/material/select';
import { LoginService } from 'src/app/login/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EmitterService } from 'src/shared/emitter.service';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';
import { InventoryService } from 'src/app/inventory/inventory.service';
import { PurchaseReport } from 'src/app/inventory/inventory.model';
import { MinimumPurchaseReport } from 'src/app/reports/reports.model';
import { ReportsService } from 'src/app/reports/reports.service';
import { DialogMinimumRatePurchaseOrderComponent } from '../dialog-minimum-rate-purchase-order/dialog-minimum-rate-purchase-order.component';

@Component({
  selector: 'app-minimum-rate-purchase-order',
  templateUrl: './minimum-rate-purchase-order.component.html',
  styleUrls: ['./minimum-rate-purchase-order.component.css']
})
export class MinimumRatePurchaseOrderComponent implements OnInit {

  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount', 'print'];



  purchaseReport: MinimumPurchaseReport = new MinimumPurchaseReport();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  datePicker: any;
  objSeller: any;
  sellerName: string;
  sellerId: any;

  startDate: string;
  endDate: string;


  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];
  productArray: any = [];

  multipleCategoriesArray: any = [];
  categoriesArray1: any = [];
  categoriesArray2: any = [];
  categoriesArray3: any = [];
  public multipleBrandArray: any = [];
  array1: any = [];
  array2: any = [];
  array3: any = [];
  finalBrandArray: any = [];
  multipleBrands: any = [];
  brands1: any = [];
  brands2: any = [];
  brands3: any = [];
  categoryList: string;
  subCategoriesList: string;
  brandList: string;
  buyingPrice: any;
  price: any;
  dbData: any = [];
  catchMappedData: any = [];
  updateAllArray: any = [];
  updateAllRecordsCount: number = 0;
  multipleEntries = [];
  multipleEntriesArray: any = [];
  isPriceValid: any;
  isMultipleAmount: boolean;
  priceList: PriceList = new PriceList();
  masterBrandData: any = [];
  selectedBrandId: number;
  anyArray: any = [];
  uniqueBrandNamesArray = [];
  finalProductArray = [];
  allSelected = false;
  filteredBrandArray: any;
  reportData: any = [];

  allBrandSelected: boolean = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('check') check: MatCheckbox;
  @ViewChild('select') select: MatSelect;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);
  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};
  productSettings = {};
  categoryId: any;
  subCategoryId: any;
  finalProductNameArray: any = [];
  MinimumReportData: any = [];


  // categoryId: string;
  // subCategoryId: string;
  AllSubCategoryArray: any = [];
  AllCategoryArray: any = [];
  categorySearch: any = [];
  subCategorySearch: any = [];
  brandSearch: any = [];
  productSearch: any = [];

  constructor(public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private inventoryService: InventoryService,
    private reportsService: ReportsService) {
  }
  // ['id', 'billingName', 'address', 'city', 'email', 'phone'];
  ngOnInit() {
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.purchaseReport.sellerId = sessionStorage.getItem('sellerId').toString();
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));
    this.categorySearch = this.loginService.seller_object.categories;
    this.getPriceListData();

    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.subCategorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.brandSettings = {
      singleSelection: false,
      idField: 'BrandID',
      textField: 'BrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 1
    };

    this.productSettings = {
      singleSelection: false,
      idField: 'ProductID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 1
    }

  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }





  onSubCategorySelectAll() {
    console.log('inside sub cat select all');
    let catchMappedSubCategory: any = [];
    this.purchaseReport.subCategoryId = 'ALL'.toString();
    console.log('ng model sub cat', this.purchaseReport.subCategoryId);

    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);
      this.multipleBrandArray = catchMappedSubCategory;
      this.finalProductNameArray = [];
      let uniqueBrands = this.createUniqueBrandName(catchMappedSubCategory);

      this.anyArray = this.sortUniqueBrandName(uniqueBrands);
      this.brandSearch = this.anyArray;
      console.log('any array', this.anyArray);
    });
    this.loginService.seller_object.categories = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
    this.finalProductNameArray = this.productSearch.slice();
  }


  onCategoriesChange(event, category: any) {
    let orderedSubCategoriesData: any = [];
    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoryId = category.id.toString();
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          orderedSubCategoriesData = this.sortArrayInAscendingOrder(data);

          this.multipleCategoriesArray = orderedSubCategoriesData;
          this.subCategorySearch = this.multipleCategoriesArray;

        });
        let eachBrandData: any = [];
        let mappedData: any = [];
        let uniqueBrandName: any = [];
        console.log('category select category id', category.id);
        this.purchaseService.getEachBrand(category.id, '0').subscribe(data => {
          eachBrandData = data;



          mappedData = this.mapObj(eachBrandData, this.dbData);

        });


      }
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
      this.finalProductNameArray = this.productSearch.slice();
    }

  }

  onSubCategoriesChange(event, subCategory: any) {

    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoryId = subCategory.id.toString();
        this.subCategoriesArray.push(subCategory.id);
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {

          this.multipleBrandArray = data;
          this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);

          this.multipleBrandArray = this.catchMappedData;

          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.brandSearch = this.anyArray;
          this.multipleBrandArray = this.catchMappedData;


        });
      }
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
      this.finalProductNameArray = this.productSearch.slice();
    }


  }

  onProductChange(event, product: any) {
    console.log('required id', product.BrandID);
    console.log('multiple brand array', this.multipleBrandArray);
    if (event.isUserInput) {
      if (event.source.selected) {
        this.purchaseReport.brandId = product.BrandID;
        console.log('ng model', this.purchaseReport.brandId);
        this.brandArray.push(product.ProductID);
        // if (this.finalBrandArray.length === 0) {
        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;
        console.log('final product array', this.finalBrandArray);


        this.finalProductNameArray = this.finalBrandArray;
        this.productSearch = this.finalProductNameArray;
        // this.productSearch = this.finalProductNameArray;

        this.loginService.seller_object.categories = this.categorySearch.slice();
        this.multipleCategoriesArray = this.subCategorySearch.slice();
        this.anyArray = this.brandSearch.slice();
        this.finalProductNameArray = this.productSearch.slice();
      }

    }
  }


  changeProduct(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        console.log(product);
        this.purchaseReport.productId = product.ProductID;
        console.log('ng model', this.purchaseReport.productId);
      }
    }
  }

  onProductSelectAll() {
    this.purchaseReport.productId = 'ALL';

    console.log('ng model product all', this.purchaseReport.productId);
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  viewPurchaseReport(response) {

    this.dialog.open(DialogMinimumRatePurchaseOrderComponent, {
      height: '600px',
      width: '1200px',
      data: response
    });
  }

  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.dbData = data;
    });
  }

  searchRecords() {

    if (this.purchaseReport.categoryId === null || this.purchaseReport.categoryId === undefined || this.purchaseReport.categoryId === '') {
      this.purchaseReport.categoryId = 'ALL';
    }
    else {
      this.purchaseReport.categoryId = this.purchaseReport.categoryId.toString();
    }

    if (this.purchaseReport.subCategoryId === null || this.purchaseReport.subCategoryId === undefined || this.purchaseReport.subCategoryId === '') {
      this.purchaseReport.subCategoryId = 'ALL';
    }
    else {
      this.purchaseReport.subCategoryId = this.purchaseReport.subCategoryId.toString();
    }

    if (this.purchaseReport.brandId === null || this.purchaseReport.brandId === undefined || this.purchaseReport.brandId === '') {
      this.purchaseReport.brandId = 'ALL'.toString();
    }
    else {
      this.purchaseReport.brandId = this.purchaseReport.brandId.toString();
    }

    if (this.purchaseReport.productId === null || this.purchaseReport.productId === undefined || this.purchaseReport.productId === '') {
      this.purchaseReport.productId = 'ALL'.toString();
    }
    else {
      this.purchaseReport.productId = this.purchaseReport.productId.toString();
    }

    if (this.startDate === null || this.startDate === undefined) {
      this.purchaseReport.startDate = 'ALL';
    }
    else {
      let startingDate = this.convertDate(this.startDate);
      this.purchaseReport.startDate = startingDate;
    }

    if (this.endDate === null || this.endDate === undefined) {
      this.purchaseReport.endDate = 'ALL';
    }
    else {
      let endingDate = this.convertDate(this.endDate);
      this.purchaseReport.endDate = endingDate;
    }

    console.log(this.purchaseReport);
    // this.inventoryService.getPurchaseOrderInventoryData(this.purchaseReport).subscribe(data => {
    //   this.reportData = data;
    //   let uniquePurchaseOrder = _.uniqBy(this.reportData, 'ProductVarientId');
    //   this.reportData = [];
    //   this.reportData = uniquePurchaseOrder;
    //   this.dataSource = new MatTableDataSource(this.reportData);
    // });

    this.reportsService.getAllMinimumPurchaseData(this.purchaseReport).subscribe(data => {
      console.log(data);
      this.MinimumReportData = data;

      this.dataSource = new MatTableDataSource(this.MinimumReportData);
    });

  }

  mapObj(apiData, ownDbData) {
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].ProductPrice = 0;
      apiData[i].Discount = 0;
      apiData[i].FinalPrice = 0;
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
          apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].FinalPrice = ownDbData[j].FinalPrice;
        }
      }
    }
    return apiData;
  }

  createUniqueBrandName(array: any) {
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
        var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID, Id: array[i].Id }
        sortedArray.push(item);
      }
    }
    return sortedArray;
  }

  createUniqueProductName(array: any) {
    let uniqueProductNameArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      // if ((uniqueProductNameArray.findIndex(p => p.Name.trim() == array[i].Name.trim())) == -1) {
      if ((uniqueProductNameArray.findIndex(p => Number(p.BrandID) == Number(array[i].BrandID))) == -1) {
        // var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID, Id: array[i].Id }
        let item = { Name: array[i].Name, ProductID: array[i].ProductID, BrandID: array[i].BrandID }
        uniqueProductNameArray.push(item);
      }
    }
    return uniqueProductNameArray;
  }
  sortUniqueBrandName(array) {
    array.sort((a, b) => {
      return a.BrandName.localeCompare(b.BrandName);
    });
    return array
  }

  sortArrayInAscendingOrder(array) {
    array.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return array;
  }

  convertDate(receivedDate) {
    let date = new Date(receivedDate);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const stringDate = [day, month, year].join("/");
    let fullDate = stringDate;
    return fullDate
  }

  // openDialog() {
  //   this.dialog.open(DialogPrintPurchaseReportComponent, {
  //     height: '600px',
  //     width: '1000px'
  //   });
  // }

}
