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


  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];

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
  isMultipleAmount: boolean = true;
  priceList: PriceList = new PriceList();
  masterBrandData: any = [];
  selectedBrandId: number;
  anyArray: any = [];
  uniqueBrandNamesArray = [];
  allSelected = false;
  allBrandSelected: boolean = false;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('check') check: MatCheckbox;
  @ViewChild('select') select: MatSelect;
  @ViewChild('BrandSelect') BrandSelect: MatSelect;
  selection = new SelectionModel<PriceList[]>(true, []);

  constructor(public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.objSeller = JSON.parse(localStorage.getItem('categories'));
    this.sellerName = localStorage.getItem('sellerName');
    this.sellerId = Number(localStorage.getItem('sellerId'));
    this.loginService.seller_object.categories = JSON.parse(localStorage.getItem('categories'));
    this.getPriceListData();
    this.getBrandsMasterData();
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
    this.selection.selected.forEach((element) => {
      this.updateAllArray.push(element);
      this.multipleEntriesArray.push(element);
    });
    this.postMultipleInsertion(this.multipleEntriesArray);
    this.updateAllRecordsCount = this.updateAllArray.length;
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

  onCategoriesChange(event, category: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.categoriesArray.push(category.id);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          if (this.multipleCategoriesArray.length === 0) {
            this.multipleCategoriesArray = data;
          }
          else {
            this.categoriesArray2 = data;
            this.categoriesArray3 = [...this.multipleCategoriesArray, ...this.categoriesArray2];
            this.multipleCategoriesArray = this.categoriesArray3;
          }
        });
      }
    }

    if (!event.source.selected) {
      let newCategoriesArr = this.multipleCategoriesArray.filter(function (item) {
        return item.id != category.id;
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
        this.subCategoriesArray.push(subCategory.id);
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
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
          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          console.log('))))) @@@@@@@@@@@', this.anyArray);
          this.multipleBrandArray = this.catchMappedData;
          // this.multipleBrandArray = this.anyArray;
        });
      }
    }
    if (!event.source.selected) {
      console.log('RsASKJAKHKJKHADKDH', subCategory);
      var newArr = this.anyArray.filter(function (item) {
        return item != subCategory.BrandName.trim();
      });
      this.multipleBrandArray = newArr;
      console.log('i REMoeved itttt FORM SUb', this.multipleBrandArray);
      // this.anyArray = this.multipleBrandArray;
      const index = this.subCategoriesArray.indexOf(subCategory.id);
      if (index > -1) {
        this.subCategoriesArray.splice(index, 1);
      }
    }

  }

  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.brandArray.push(product.ProductID);
        console.log('brand Array ', this.brandArray);
        if (this.finalBrandArray.length === 0) {
          let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product
          });
          this.finalBrandArray = filteredBrandArray;
          // this.multipleBrandArray = this.finalBrandArray;
          this.dataSource = new MatTableDataSource(this.finalBrandArray);
          this.dataSource.paginator = this.paginator;
        }
        else {
          this.brands1 = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product
          });
          this.brands2 = this.brands1;
          this.brands3 = [...this.finalBrandArray, ...this.brands2];
          this.finalBrandArray = this.brands3;
          // this.multipleBrandArray = this.finalBrandArray;
          // console.log('else block', this.finalBrandArray);
          this.dataSource = new MatTableDataSource(this.finalBrandArray);
          this.dataSource.paginator = this.paginator;
        }

      }
      if (!event.source.selected) {
        var tempArr = this.finalBrandArray.filter(function (item) {
          return item.BrandName.trim() != product;
        });
        this.finalBrandArray = tempArr;
        console.log('after un selection: ', this.finalBrandArray);
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
      // let isPriceValid = this.priceList.buyingPrice - this.priceList.discount === this.priceList.finalPrice;
      let isPriceValid = true;
      if (isPriceValid) {
        this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
          this.toastr.success('price list saved');
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
      this.isPriceValid = this.priceList.buyingPrice - this.priceList.discount === this.priceList.finalPrice;
      if (this.isPriceValid) {
        this.multipleEntries.push(this.priceList);
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
      });
    }
    else {
      this.toastr.error('Please Check Buying Price, Discount and Final Price');
    }
  }

  createUniqueBrandName(array: any) {
    let sortedArray: Array<any> = [];
    console.log('array length', array.length);
    for (let i = 0; i < array.length; i++) {
      if (sortedArray.indexOf(array[i].BrandName.trim()) == -1) {
        sortedArray.push(array[i].BrandName.trim());
      }
    }
    return sortedArray;
  }
  sortUniqueBrandName(array) {
    return array.sort();
  }

}
