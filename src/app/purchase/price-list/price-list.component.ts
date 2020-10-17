import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentPriceListComponent } from '../dialog-content-price-list/dialog-content-price-list.component';
import { LoginService } from 'src/app/login/login.service';
import { PurchaseService } from '../purchase.service';
import { MatPaginator } from '@angular/material/paginator';
import { PriceList } from '../purchase.model';
import { EmitterService } from 'src/shared/emitter.service';
// import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgModel } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MyPipePipe } from '../my-pipe.pipe';
import { EventManager } from '@angular/platform-browser';
import * as _ from 'lodash';
import { MatCardTitleGroup } from '@angular/material/card';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit, AfterViewChecked {



  displayedColumns: string[] = ['select', 'productId', 'brandName', 'productName', 'quantity', 'actualPrice', 'discount', 'finalPrice', 'availableQuantity', 'save'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: any;
  datePicker: any;
  objSeller: any;
  sellerName: string;
  sellerId: any;
  categorySettings = {};
  subCategorySettings = {};
  brandSettings = {};

  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];

  selectedCategory: any = [];
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
  selectedSubCategory: any = [];
  allSelected = false;
  allBrandSelected: boolean = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('check') check: MatCheckbox;
  @ViewChild('select') select: MatSelect;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);
  categoryId: string;
  subCategoryId: string;
  AllSubCategoryArray: any = [];
  AllCategoryArray: any = [];
  categorySearch: any = [];
  subCategorySearch: any = [];
  brandSearch: any = [];

  constructor(public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.objSeller = JSON.parse(sessionStorage.getItem('categories'));
    this.sellerName = sessionStorage.getItem('sellerName');
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.loginService.seller_object.categories = JSON.parse(sessionStorage.getItem('categories'));

    let data = this.sortArrayInAscendingOrder(this.loginService.seller_object.categories);
    this.loginService.seller_object.categories = [];
    this.loginService.seller_object.categories = data;
    this.categorySearch = this.loginService.seller_object.categories;

    this.getPriceListData();
    this.getBrandsMasterData();

    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'All',
      unSelectAllText: 'All',
      itemsShowLimit: 1,
      enableCheckAll: true,
      allowSearchFilter: true,

    };

    this.subCategorySettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true
    };

    this.brandSettings = {
      singleSelection: true,
      idField: 'BrandID',
      textField: 'BrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      itemsShowLimit: 1
    };


  }

  onChange(event) {
    if (event.checked === true) {
      this.updateAllRecordsCount++;
    }
    else {
      this.updateAllRecordsCount--;
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    this.updateAllRecordsCount = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.updateAllRecordsCount = 0;
    }
    else {
      this.dataSource.data.forEach((row) => {
        this.selection.select(row);
      });

    }
  }

  logSelection() {
    this.isPriceValid = true;
    this.selection.selected.forEach((element) => {
      this.updateAllArray.push(element);
      this.multipleEntriesArray.push(element);
    });
    this.postMultipleInsertion(this.multipleEntriesArray);

    this.updateAllRecordsCount = this.updateAllArray.length;
    this.multipleEntriesArray = [];
    this.updateAllArray = [];
  }

  getBrandsMasterData() {
    setTimeout(() => {
      this.purchaseService.getEveryBrand().subscribe(data => {
        this.masterBrandData = data;
      });
    }, 400);
  }

  openDialog() {
    this.dialog.open(DialogContentPriceListComponent, {
      height: '600px',
      width: '800px',
    });
  }



  onCategorySelectAll() {
    console.log('inside cat seelct all');
    let catchMappedCategory: any = [];
    this.purchaseService.getEveryBrand().subscribe(data => {

      this.AllCategoryArray = data;
      this.multipleCategoriesArray = [];
      catchMappedCategory = this.mapObj(this.AllCategoryArray, this.dbData);
      this.dataSource = [];
      this.dataSource = new MatTableDataSource(catchMappedCategory);
      this.dataSource.paginator = this.paginator;

      let uniqueBrandName = this.createUniqueBrandName(this.AllCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandName);
      console.log(this.anyArray);
      this.brandSearch = this.anyArray;
      console.log('any array in cat', this.anyArray);
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
    });

  }


  onSubCategorySelectAll() {
    console.log('inside sub cat select all');
    let catchMappedSubCategory: any = [];
    console.log('cat id', this.categoryId.toString());
    this.purchaseService.getEachBrand(this.categoryId.toString(), '0').subscribe(data => {
      this.AllSubCategoryArray = data;
      catchMappedSubCategory = this.mapObj(this.AllSubCategoryArray, this.dbData);

      this.dataSource = new MatTableDataSource(catchMappedSubCategory);
      this.dataSource.paginator = this.paginator;

      let uniqueBrands = this.createUniqueBrandName(this.AllSubCategoryArray);
      this.anyArray = this.sortUniqueBrandName(uniqueBrands);
      this.brandSearch = this.anyArray;
     
      console.log('any array', this.anyArray);
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
    });

  }

  onBrandSelectAll() {
    let mappedBrandData: any = [];
    let brandData: any = [];
    let uniqueBrandNameData: any = [];

    this.purchaseService.getAllBrand(this.categoryId, this.subCategoryId).subscribe(data => {

      brandData = data;

      mappedBrandData = this.mapObj(brandData, this.dbData);
      // this.multipleBrandArray = this.catchMappedData;
      this.dataSource = new MatTableDataSource(mappedBrandData);
      this.dataSource.paginator = this.paginator;
      uniqueBrandNameData = this.createUniqueBrandName(mappedBrandData);
      this.anyArray = this.sortUniqueBrandName(uniqueBrandNameData);
      // this.multipleBrandArray = this.catchMappedData;
      this.brandSearch = this.anyArray;
      console.log(this.anyArray);
      this.loginService.seller_object.categories = this.categorySearch.slice();
      this.multipleCategoriesArray = this.subCategorySearch.slice();
      this.anyArray = this.brandSearch.slice();
    });
  }

  onCategoriesChange(event, category: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoryId = category.id.toString();
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          // if (this.multipleCategoriesArray.length === 0) {
          this.multipleCategoriesArray = data;
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

          this.dataSource = new MatTableDataSource(mappedData);
          this.dataSource.paginator = this.paginator;
          // uniqueBrandName = this.createUniqueBrandName(mappedData);
          // this.anyArray = this.sortUniqueBrandName(uniqueBrandName);
        });


      }
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
          console.log(this.anyArray);
          this.multipleBrandArray = this.catchMappedData;
          this.brandSearch = this.anyArray;
          this.dataSource = new MatTableDataSource(this.catchMappedData);
          this.dataSource.paginator = this.paginator;

        });
        this.anyArray = this.brandSearch.slice();
      }
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
      this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
      this.dataSource.paginator = this.paginator;
    }

  }

  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.dataSource = [];
        this.brandArray.push(product.ProductID);
        // if (this.finalBrandArray.length === 0) {
        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product.BrandName;
        });
        this.finalBrandArray = filteredBrandArray;

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
        this.dataSource = [];
        this.dataSource = new MatTableDataSource(this.finalBrandArray);
        this.dataSource.paginator = this.paginator;

      }
      if (!event.source.selected) {
        var tempArr = this.finalBrandArray.filter(function (item) {
          return item.BrandName.trim() != product.BrandName;
        });
        this.finalBrandArray = tempArr;
        this.dataSource = new MatTableDataSource(this.finalBrandArray);
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  editPriceList(element) {
    if (element.priceListId) {

      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;
      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;
      this.priceList.ReferenceId = element.Id;
      this.priceList.discount = element.Discount;
      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;
      this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
        this.toastr.success('price list updated');
      });
    }
    else {

      this.priceList.priceListId = element.priceListId;
      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;

      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;

      this.priceList.ReferenceId = element.Id;

      this.priceList.discount = element.Discount;

      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;
      let isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
      if (isPriceValid) {
        this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
          this.toastr.success('price list saved');
          this.priceList.buyingPrice = 0;
          this.priceList.discount = 0;
          this.priceList.finalPrice = 0;
        });
      }
      else {
        this.toastr.error('Please Check Buying Price, Discount and Final Price');
      }
    }
  }

  getPriceListData() {
    this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
      this.dbData = data;
    });
  }


  postMultipleInsertion(elements) {
    elements.forEach(element => {
      this.priceList = new PriceList();
      this.priceList.priceListId = element.priceListId;
      this.priceList.sellerId = element.SellerId;
      this.priceList.productId = element.ProductID;
      this.priceList.subCategoryId = element.SubCategoryID;
      this.priceList.brandId = element.BrandID;

      this.priceList.buyingPrice = element.ProductPrice;
      this.priceList.finalPrice = element.FinalPrice;

      this.priceList.ReferenceId = element.Id;

      this.priceList.discount = element.Discount;
      this.priceList.availableQuantity = element.AvailableQuantity;
      this.priceList.quantity = element.Quantity;
      this.priceList.ProductVarientId = element.ProductVarientId;

      this.isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
      if (this.isPriceValid) {
        this.multipleEntries.push(this.priceList);
        this.isMultipleAmount = true;
      }
      else {
        this.isMultipleAmount = false;
      }
    });
    if (this.isMultipleAmount) {
      this.purchaseService.saveMultiplePriceList(this.multipleEntries).subscribe(data => {
        this.toastr.success('price list saved');
        this.selection.clear();
        this.updateAllRecordsCount = 0;
        this.priceList = new PriceList();
        this.priceList.buyingPrice = 0;
        this.priceList.discount = 0;
        this.priceList.finalPrice = 0;
        this.updateAllArray = [];
        this.multipleEntriesArray = [];
      });
    }
    else {
      this.toastr.error('Please Check Buying Price, Discount and Final Price');
      this.multipleEntriesArray = [];
    }
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
    console.log('inside funcn *',array);
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
        var item = { BrandName: array[i].BrandName.trim(), SubCategoryID: array[i].SubCategoryID, BrandID: array[i].BrandID }
        sortedArray.push(item);
      }
    }
    return sortedArray;
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

}
