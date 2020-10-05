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
import { PurchaseReport } from '../inventory.model';
import { DialogPrintPurchaseReportComponent } from '../dialog-print-purchase-report/dialog-print-purchase-report.component';
import { InventoryService } from '../inventory.service';
// import { DialogPurchaseReportInventoryComponent } from '../dialog-purchase-report-inventory/dialog-purchase-report-inventory.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {
  // ['ProductName', 'BrandName', 'Name', 'PurchaseQuantity', 'BuyingPrice', 'Discount', 'FinalPrice'];
  displayedColumns: string[] = ['ProductName', 'BrandName', 'Varient', 'ProductMRP', 'ProductDiscount', 'totalQuantityOrder', 'totalFinalPrice', 'totalDiscountPrice', 'FinalPurchaseAmount', 'print'];



  purchaseReport: PurchaseReport = new PurchaseReport();

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
  reportData: any = [];


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
    private inventoryService: InventoryService) {
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


  onCategorySelectAll() {
    console.log('inside cat seelct all');
    this.purchaseReport.categoryId = 'ALL';
    let catchMappedCategory: any = [];
    let productNamesArray: any = [];
    this.purchaseService.getEveryBrand().subscribe(data => {

      this.AllCategoryArray = data;
      this.multipleCategoriesArray = [];
      catchMappedCategory = this.mapObj(this.AllCategoryArray, this.dbData);
      this.dataSource = [];
      // this.dataSource = new MatTableDataSource(catchMappedCategory);
      // this.dataSource.paginator = this.paginator;

      let uniqueBrandName = this.createUniqueBrandName(this.AllCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandName);
      this.BrandSelect = this.anyArray;
      console.log('any array in cat', this.anyArray);
      productNamesArray = this.createUniqueProductName(this.anyArray);
      // this.finalProductNameArray = this.sortArrayInAscendingOrder(productNameArray);
      this.finalProductNameArray = productNamesArray;
      this.productSearch = this.finalProductNameArray;
      // this.productSearch = this.finalProductNameArray;
      console.log('product array', this.finalProductNameArray);
    });
    this.loginService.seller_object.categories = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
    this.finalProductNameArray = this.productSearch.slice();
  }


  onSubCategorySelectAll() {
    console.log('inside sub cat select all');
    let catchMappedSubCategory: any = [];
    // this.purchaseReport.subCategoryId
    console.log('cat id', this.categoryId.toString());
    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);

      // this.dataSource = new MatTableDataSource(catchMappedSubCategory);
      // this.dataSource.paginator = this.paginator;
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

  onBrandSelectAll() {
    let mappedBrandData: any = [];
    let brandData: any = [];
    let uniqueBrandNameData: any = [];

    this.purchaseService.getAllBrand(this.categoryId, this.subCategoryId).subscribe(data => {

      brandData = data;

      mappedBrandData = this.mapObj(brandData, this.dbData);
      // this.multipleBrandArray = this.catchMappedData;
      // this.dataSource = new MatTableDataSource(mappedBrandData);
      // this.dataSource.paginator = this.paginator;
      uniqueBrandNameData = this.createUniqueBrandName(mappedBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandNameData);
      this.brandSearch = this.anyArray;
      // this.multipleBrandArray = this.catchMappedData;

    });

    this.loginService.seller_object.categories = this.categorySearch.slice();
    this.multipleCategoriesArray = this.subCategorySearch.slice();
    this.anyArray = this.brandSearch.slice();
    this.finalProductNameArray = this.productSearch.slice();
  }

  onCategorySelect(event) {
    this.categoriesArray.push(event.id);

    this.purchaseService.getAllSubCategories(event.id).subscribe(data => {
      if (this.multipleCategoriesArray.length === 0) {
        this.multipleCategoriesArray = data;
        let sortedCategory = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
        this.multipleCategoriesArray = [];
        this.multipleCategoriesArray = sortedCategory;

      }
      else {
        this.categoriesArray2 = data;
        this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
        this.multipleCategoriesArray = this.categoriesArray3;
        let sortedCategories = this.sortArrayInAscendingOrder(this.multipleCategoriesArray);
        this.multipleCategoriesArray = [];
        this.multipleCategoriesArray = sortedCategories;

      }
    });
    // let eachBrandData: any = [];
    // let mappedData: any = [];
    // let uniqueBrandName: any = [];

    // this.purchaseService.getEachBrand(event.id, '0').subscribe(data => {
    //   console.log('inside');
    //   eachBrandData = data;
    //   console.log('each brand data from cat', eachBrandData);
    //   mappedData = this.mapObj(eachBrandData, this.dbData);

    //   // this.dataSource = new MatTableDataSource(mappedData);
    //   // this.dataSource.paginator = this.paginator;
    //   // uniqueBrandName = this.createUniqueBrandName(mappedData);
    //   // this.anyArray = this.sortUniqueBrandName(uniqueBrandName);
    // });

    // console.log('outside');
  }

  onCategoryDeSelect(event) {
    let remainingCategoriesArray = this.multipleCategoriesArray.filter(function (item) {
      return Number(item.parentid) !== Number(event.id);
    });
    this.multipleCategoriesArray = [];
    this.multipleCategoriesArray = remainingCategoriesArray;

    if (this.multipleCategoriesArray.length === 0) {
      this.multipleCategoriesArray = [];
      this.anyArray = [];
      this.dataSource = [];
    }


    const index = this.categoriesArray.indexOf(event.id);
    if (index > -1) {
      this.categoriesArray.splice(index, 1);
    }

  }

  onCategoryDeSelectAll(event) {
    console.log('disselect all', event);
  }

  onSubCategorySelect(event, data) {
    this.subCategoriesArray.push(event.id);


    this.purchaseService.getAllBrand(data[0].parentid, event.id).subscribe(data => {
      if (this.multipleBrandArray.length === 0) {
        this.multipleBrandArray = data;
        this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);
        // this.multipleBrandArray = this.catchMappedData;
      }
      else {
        this.array2 = data;
        this.array2 = this.mapObj(this.array2, this.dbData);
        this.array3 = [...this.catchMappedData, ...this.array2];
        this.catchMappedData = this.array3;
      }
      // this.dataSource = new MatTableDataSource(this.catchMappedData);
      // this.dataSource.paginator = this.paginator;
      this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
      this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
      this.brandSearch = this.anyArray;
      this.multipleBrandArray = this.catchMappedData;

    });
  }

  onSubCategoryDeSelect(event) {
    let newArr = [];
    newArr = this.anyArray.filter(function (item) {
      return Number(item.SubCategoryID) !== Number(event.id);
    });
    this.anyArray = [];
    this.anyArray = newArr;
    let unSelectedSubCategoryArray = this.finalBrandArray.filter(function (item) {
      return Number(item.SubCategoryID) !== Number(event.id);
    });
    this.finalBrandArray = unSelectedSubCategoryArray;
    // this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
    // this.dataSource.paginator = this.paginator;

    const index = this.subCategoriesArray.indexOf(event.id);
    if (index > -1) {
      this.subCategoriesArray.splice(index, 1);
    }

  }


  onBrandSelect(event) {
    this.brandArray.push(event.BrandID);
    let productNameArray: any;
    if (this.finalBrandArray.length === 0) {
      let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName
      });
      this.finalBrandArray = filteredBrandArray;
      // this.dataSource = new MatTableDataSource(this.finalBrandArray);
      // this.dataSource.paginator = this.paginator;
    }
    else {
      this.brands1 = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName
      });
      this.brands2 = this.brands1;
      this.brands3 = [...this.finalBrandArray, ...this.brands2];
      this.finalBrandArray = this.brands3;

      // this.dataSource = new MatTableDataSource(this.finalBrandArray);
      // this.dataSource.paginator = this.paginator;
    }

    productNameArray = this.createUniqueProductName(this.finalBrandArray);
    // this.finalProductNameArray = this.sortArrayInAscendingOrder(productNameArray);
    this.finalProductNameArray = productNameArray;
    this.productSearch = this.finalProductNameArray;
    // this.productSearch = this.finalProductNameArray; 

    this.finalProductNameArray = this.productSearch.slice();
  }

  onBrandDeSelect(event) {
    var tempArr = this.finalBrandArray.filter(function (item) {
      return item.BrandName.trim() != event.BrandName.trim();
    });
    this.finalBrandArray = tempArr;

    const index = this.brandArray.indexOf(event.BrandID);
    if (index > -1) {
      this.brandArray.splice(index, 1);
    }

    // this.dataSource = new MatTableDataSource(this.finalBrandArray);
    // this.dataSource.paginator = this.paginator;
  }

  productChange(event) {


    this.productArray.push(event.ProductID);
    // if (this.finalBrandArray.length === 0) {
    //   let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
    //     return item.BrandName.trim() === event.BrandName;
    //   });
    //   this.finalBrandArray = filteredBrandArray;
    // }
    // else {
    //   this.brands1 = this.multipleBrandArray.filter(function (item) {
    //     return item.BrandName.trim() === event.BrandName
    //   });
    //   this.brands2 = this.brands1;
    //   this.brands3 = [...this.finalBrandArray, ...this.brands2];
    //   this.finalBrandArray = this.brands3;
    // }
    // console.log('final brand ', this.finalBrandArray);



  }
  onProductDeSelect(event) {

    const index = this.productArray.indexOf(event.ProductID);
    if (index > -1) {
      this.productArray.splice(index, 1);
    }

  }




  onCategoriesChange(event, category: any) {
    let orderedSubCategoriesData: any = [];
    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoryId = category.id.toString();
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          orderedSubCategoriesData = this.sortArrayInAscendingOrder(data);
          // if (this.multipleCategoriesArray.length === 0) {
          this.multipleCategoriesArray = orderedSubCategoriesData;
          this.subCategorySearch = this.multipleCategoriesArray;
          // }
          // else {
          //   this.categoriesArray2 = data;
          //   this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
          //   this.multipleCategoriesArray = this.categoriesArray3;
          // }
        });
        let eachBrandData: any = [];
        let mappedData: any = [];
        let uniqueBrandName: any = [];
        console.log('category select category id', category.id);
        this.purchaseService.getEachBrand(category.id, '0').subscribe(data => {
          eachBrandData = data;
          // this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          // this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);


          mappedData = this.mapObj(eachBrandData, this.dbData);

          // this.dataSource = new MatTableDataSource(mappedData);
          // this.dataSource.paginator = this.paginator;
          // uniqueBrandName = this.createUniqueBrandName(mappedData);
          // this.anyArray = this.sortUniqueBrandName(uniqueBrandName);
        });


      }
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
      this.finalProductNameArray = this.productSearch.slice();
    }

    if (!event.source.selected) {
      let newCategoriesArr = this.multipleCategoriesArray.filter(function (item) {
        return Number(item.parentid) !== Number(category.id);
      });
      this.multipleCategoriesArray = newCategoriesArr;
      const index = this.categoriesArray.indexOf(category.id);
      if (index > -1) {
        this.categoriesArray.splice(index, 1);
      }
    }
  }

  onSubCategoriesChange(event, subCategory: any) {

    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoryId = subCategory.id.toString();
        this.subCategoriesArray.push(subCategory.id);
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
          // if (this.multipleBrandArray.length === 0) {
          this.multipleBrandArray = data;
          this.catchMappedData = this.mapObj(this.multipleBrandArray, this.dbData);

          this.multipleBrandArray = this.catchMappedData;
          // }
          // else {
          //   this.array2 = data;
          //   this.array2 = this.mapObj(this.array2, this.dbData);
          //   this.array3 = [...this.catchMappedData, ...this.array2];
          //   this.catchMappedData = this.array3;
          // }
          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.brandSearch = this.anyArray;
          this.multipleBrandArray = this.catchMappedData;

          // this.dataSource = new MatTableDataSource(this.catchMappedData);
          // this.dataSource.paginator = this.paginator;

        });
      }
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
      this.finalProductNameArray = this.productSearch.slice();
    }
    if (!event.source.selected) {
      let newArr = [];
      newArr = this.anyArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id;
      });
      this.anyArray = [];
      this.anyArray = newArr;
      let unSelectedSubCategoryArray = this.finalBrandArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id
      });
      this.finalBrandArray = unSelectedSubCategoryArray;
      // this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
      // this.dataSource.paginator = this.paginator;
    }

  }

  onProductChange(event, product: any) {
    console.log(product);
    console.log('multiple brand array', this.multipleBrandArray);
    if (event.isUserInput) {
      if (event.source.selected) {
        this.dataSource = [];
        this.brandArray.push(product.ProductID);
        // if (this.finalBrandArray.length === 0) {
        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;
        console.log('final product array', this.finalBrandArray);

        // this.dataSource = new MatTableDataSource(this.finalBrandArray);
        // this.dataSource.paginator = this.paginator;
        // }
        // else {
        //   this.brands1 = this.multipleBrandArray.filter(function (item) {
        //     return item.BrandName.trim() === product.BrandName
        //   });
        //   this.brands2 = this.brands1;
        //   this.brands3 = [...this.finalBrandArray, ...this.brands2];
        //   this.finalBrandArray = this.brands3;

        // }
        // this.dataSource = [];
        // this.dataSource = new MatTableDataSource(this.finalBrandArray);
        // this.dataSource.paginator = this.paginator;

        // productNameArray = this.createUniqueProductName(this.finalBrandArray);

        // this.finalProductNameArray = this.sortArrayInAscendingOrder(productNameArray);
        // this.finalProductNameArray = productNameArray;
        this.finalProductNameArray = this.finalBrandArray;
        this.productSearch = this.finalProductNameArray;
        // this.productSearch = this.finalProductNameArray;

        this.loginService.seller_object.categories = this.categorySearch.slice();
        this.multipleCategoriesArray = this.subCategorySearch.slice();
        this.anyArray = this.brandSearch.slice();
        this.finalProductNameArray = this.productSearch.slice();
      }
      if (!event.source.selected) {
        var tempArr = this.finalBrandArray.filter(function (item) {
          return item.BrandName.trim() != product.BrandName;
        });
        this.finalBrandArray = tempArr;
        // this.dataSource = new MatTableDataSource(this.finalBrandArray);
        // this.dataSource.paginator = this.paginator;
      }
    }
  }


  changeProduct(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        console.log(product);
      }
    }
  }

  onProductSelectAll() {
    this.purchaseReport.productId = 'ALL';
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }


  viewPurchaseReport(response) {

    this.dialog.open(DialogPrintPurchaseReportComponent, {
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
      this.purchaseReport.categoryId = ['ALL'].toString();
    }
    else {
      // this.purchaseReport.categoryId = this.categoriesArray.toString();
      this.purchaseReport.categoryId;
    }

    if (this.purchaseReport.subCategoryId === null || this.purchaseReport.subCategoryId === undefined || this.purchaseReport.subCategoryId === '') {
      this.purchaseReport.subCategoryId = ['ALL'].toString();
    }
    else {
      // this.purchaseReport.subCategoryId = this.subCategoriesArray.toString();
      this.purchaseReport.subCategoryId;
    }

    if (this.purchaseReport.brandId === null || this.purchaseReport.brandId === undefined || this.purchaseReport.brandId === '') {
      this.purchaseReport.brandId = ['ALL'].toString();
    }
    else {
      // this.purchaseReport.brandId = this.brandArray.toString();
    }

    if (this.purchaseReport.productId === null || this.purchaseReport.productId === undefined || this.purchaseReport.productId === '') {
      this.purchaseReport.productId = ['ALL'].toString();
    }
    else {
      // this.purchaseReport.productId = this.productArray.toString();
      this.purchaseReport.productId;
    }
    // this.productArray
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
    this.inventoryService.getPurchaseOrderInventoryData(this.purchaseReport).subscribe(data => {
      console.log(data);
      this.reportData = data;
      let uniquePurchaseOrder = _.uniqBy(this.reportData, 'ProductVarientId');
      this.reportData = [];
      this.reportData = uniquePurchaseOrder;

      this.dataSource = new MatTableDataSource(this.reportData);
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
