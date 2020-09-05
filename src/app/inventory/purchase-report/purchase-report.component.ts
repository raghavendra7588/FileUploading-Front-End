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

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {

  // displayedColumns: string[] = ['billingName', 'address', 'city', 'email', 'phone'];

  displayedColumns: string[] = ['vendorName', 'orderNo', 'orderDate', 'deliveryDate', 'batchNo'];

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
  productArray: any = [];
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
    private cdr: ChangeDetectorRef,
    private inventoryService: InventoryService) {
  }
  // ['id', 'billingName', 'address', 'city', 'email', 'phone'];
  ngOnInit() {
    this.objSeller = JSON.parse(localStorage.getItem('categories'));
    this.sellerName = localStorage.getItem('sellerName');
    this.sellerId = Number(localStorage.getItem('sellerId'));
    this.loginService.seller_object.categories = JSON.parse(localStorage.getItem('categories'));
    this.getPriceListData();
    this.dataSource = [
      { billingName: 'ABC', address: 'ABC', city: 'Aurangabad', email: 'abc@gmail.com', phone: 7588641864 },
      { billingName: 'ABC', address: 'ABC', city: 'Aurangabad', email: 'abc@gmail.com', phone: 7588641864 }
    ];


  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
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
          this.multipleBrandArray = this.catchMappedData;

        });
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
      // this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
      // this.dataSource.paginator = this.paginator;
    }

  }

  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.brandArray.push(product.ProductID);
        if (this.finalBrandArray.length === 0) {
          let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          this.finalBrandArray = filteredBrandArray;
          // this.dataSource = new MatTableDataSource(this.finalBrandArray);
          // this.dataSource.paginator = this.paginator;
        }
        else {
          this.brands1 = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          this.brands2 = this.brands1;
          this.brands3 = [...this.finalBrandArray, ...this.brands2];
          this.finalBrandArray = this.brands3;
          // this.dataSource = new MatTableDataSource(this.finalBrandArray);
          // this.dataSource.paginator = this.paginator;
        }

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
        console.log('product', product);
      }
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  // editPriceList(element) {
  //   if (element.priceListId) {
  //     this.priceList.sellerId = element.SellerId;
  //     this.priceList.productId = element.ProductID;
  //     this.priceList.subCategoryId = element.SubCategoryID;
  //     this.priceList.brandId = element.BrandID;
  //     this.priceList.buyingPrice = element.ProductPrice;
  //     this.priceList.finalPrice = element.FinalPrice;
  //     this.priceList.ReferenceId = element.Id;
  //     this.priceList.discount = element.Discount;
  //     this.priceList.availableQuantity = element.AvailableQuantity;
  //     this.priceList.quantity = element.Quantity;
  //     this.priceList.ProductVarientId = element.ProductVarientId;
  //     this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
  //       this.toastr.success('price list updated');
  //     });
  //   }
  //   else {
  //     this.priceList.priceListId = element.priceListId;
  //     this.priceList.sellerId = element.SellerId;
  //     this.priceList.productId = element.ProductID;
  //     this.priceList.subCategoryId = element.SubCategoryID;
  //     this.priceList.brandId = element.BrandID;

  //     this.priceList.buyingPrice = element.ProductPrice;
  //     this.priceList.finalPrice = element.FinalPrice;

  //     this.priceList.ReferenceId = element.Id;

  //     this.priceList.discount = element.Discount;

  //     this.priceList.availableQuantity = element.AvailableQuantity;
  //     this.priceList.quantity = element.Quantity;
  //     this.priceList.ProductVarientId = element.ProductVarientId;
  //     let isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
  //     if (isPriceValid) {
  //       this.purchaseService.savePriceListMaster(this.priceList).subscribe(data => {
  //         this.toastr.success('price list saved');
  //         this.priceList.buyingPrice = 0;
  //         this.priceList.discount = 0;
  //         this.priceList.finalPrice = 0;
  //       });
  //     }
  //     else {
  //       this.toastr.error('Please Check Buying Price, Discount and Final Price');
  //     }
  //   }
  // }

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

  // postMultipleInsertion(elements) {
  //   elements.forEach(element => {
  //     this.priceList = new PriceList();
  //     this.priceList.priceListId = element.priceListId;
  //     this.priceList.sellerId = element.SellerId;
  //     this.priceList.productId = element.ProductID;
  //     this.priceList.subCategoryId = element.SubCategoryID;
  //     this.priceList.brandId = element.BrandID;

  //     this.priceList.buyingPrice = element.ProductPrice;
  //     this.priceList.finalPrice = element.FinalPrice;

  //     this.priceList.ReferenceId = element.Id;

  //     this.priceList.discount = element.Discount;
  //     this.priceList.availableQuantity = element.AvailableQuantity;
  //     this.priceList.quantity = element.Quantity;
  //     this.priceList.ProductVarientId = element.ProductVarientId;

  //     this.isPriceValid = (Number(this.priceList.buyingPrice) - Number(this.priceList.discount)) === Number(this.priceList.finalPrice);
  //     if (this.isPriceValid) {
  //       this.multipleEntries.push(this.priceList);
  //       this.isMultipleAmount = true;
  //     }
  //     else {
  //       this.isMultipleAmount = false;
  //     }
  //   });
  //   if (this.isMultipleAmount) {
  //     this.purchaseService.saveMultiplePriceList(this.multipleEntries).subscribe(data => {
  //       this.toastr.success('price list saved');
  //       this.selection.clear();
  //       this.updateAllRecordsCount = 0;
  //       this.priceList = new PriceList();
  //       this.priceList.buyingPrice = 0;
  //       this.priceList.discount = 0;
  //       this.priceList.finalPrice = 0;
  //       this.updateAllArray = [];
  //       this.multipleEntriesArray = [];
  //     });
  //   }
  //   else {
  //     this.toastr.error('Please Check Buying Price, Discount and Final Price');
  //     this.multipleEntriesArray = [];
  //   }
  // }

  searchRecords() {

    if (this.purchaseReport.categoryId === null || this.purchaseReport.categoryId === undefined) {
      this.purchaseReport.categoryId = ['ALL'].toString();
    }
    else {
      // this.purchaseReport.categoryId = this.purchaseReport.categoryId.toString();
    }

    if (this.purchaseReport.subCategoryId === null || this.purchaseReport.subCategoryId === undefined) {
      this.purchaseReport.subCategoryId = ['ALL'].toString();
    }
    else {
      // this.purchaseReport.subCategoryId = this.purchaseReport.subCategoryId.toString();
    }

    if (this.purchaseReport.brandId === null || this.purchaseReport.brandId === undefined) {
      this.purchaseReport.brandId = ['ALL'].toString();
    }
    else {
      // this.purchaseReport.brandId = this.purchaseReport.brandId.toString();
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

    console.log('purchase Report', this.purchaseReport);
    this.inventoryService.getPurchaseOrderInventoryData(this.purchaseReport).subscribe(data => {
      console.log(data);
    });

  }

  createUniqueBrandName(array: any) {
    let sortedArray: Array<any> = [];
    for (let i = 0; i < array.length; i++) {
      if ((sortedArray.findIndex(p => p.BrandName.trim() == array[i].BrandName.trim())) == -1) {
        var item = { BrandName: array[i].BrandName.trim(), BrandID: array[i].BrandID, SubCategoryID: array[i].SubCategoryID }
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

  convertDate(receivedDate) {
    let date = new Date(receivedDate);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const stringDate = [day, month, year].join("/");
    let fullDate = stringDate;
    return fullDate
  }


  openDialog() {
    this.dialog.open(DialogPrintPurchaseReportComponent, {
      height: '600px',
      width: '1000px'
    });
  }

}
