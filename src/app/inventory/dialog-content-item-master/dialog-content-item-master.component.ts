import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/login/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { EmitterService } from 'src/shared/emitter.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import * as _ from 'lodash';
import { PurchaseService } from 'src/app/purchase/purchase.service';
import { PriceList } from 'src/app/purchase/purchase.model';
import { ItemMaster } from '../inventory.model';
import { InventoryService } from '../inventory.service';


@Component({
  selector: 'app-dialog-content-item-master',
  templateUrl: './dialog-content-item-master.component.html',
  styleUrls: ['./dialog-content-item-master.component.css']
})
export class DialogContentItemMasterComponent implements OnInit {

  measurementUnit: any = [];
  activeStaus: any = [];
  saveItemMasterForm: FormGroup;

  itemMaster: ItemMaster = new ItemMaster();

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
  selectedCategoryIdArray: any = [];
  selectedSubCategoryIdArray: any = [];
  selectedBrandIdArray: any = [];
  itemMasterData: any = [];
  measurementUnitArray: any = [];

  constructor(public dialog: MatDialog,
    public loginService: LoginService,
    public purchaseService: PurchaseService,
    public emitterService: EmitterService,
    public toastr: ToastrService,
    public formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<DialogContentItemMasterComponent>,
    public inventoryService: InventoryService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

    this.saveItemMasterForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      underGroup: [''],
      barCode: [''],
      categories: [''],
      subCategories: [''],
      brand: [''],
      gstClassification: [''],
      activeStatus: [''],
      purchaseDescription: [''],
      purchaseMeasurementUnit: [''],
      purchaseVarient: [''],
      purchasePrice: [''],
      purchaseDiscount: [''],
      finalPurchasePrice: [''],
      salesDescription: [''],
      salesMeasurementUnit: [''],
      salesVarient: [''],
      salesPrice: [''],
      salesDiscount: [''],
      finalSellingPrice: [''],
      itemType: [''],
      minimumLevel: [''],
      serialTracking: ['']
    });
    this.itemMasterData = data;
  }

  ngOnInit(): void {

    this.objSeller = JSON.parse(localStorage.getItem('categories'));
    this.sellerName = localStorage.getItem('sellerName');
    this.sellerId = Number(localStorage.getItem('sellerId'));
    this.itemMaster.sellerId = localStorage.getItem('sellerId').toString();
    this.loginService.seller_object.categories = JSON.parse(localStorage.getItem('categories'));
    let data = this.sortArrayInAscendingOrder(this.loginService.seller_object.categories);
    this.loginService.seller_object.categories = [];
    this.loginService.seller_object.categories = data;


    let x = 6.25;
    console.log('num', Number(x));

    if (this.itemMasterData) {
      this.assignValues();
    }
    // this.defaultValues();

    // this.getPriceListData();
    this.getBrandsMasterData();

    this.categorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.subCategorySettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.brandSettings = {
      singleSelection: false,
      idField: 'BrandID',
      textField: 'BrandName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      badgeShowLimit: 4,
      allowSearchFilter: true
    };

    0
    this.measurementUnitData();

    this.measurementUnit = [
      { id: '0', title: 'KG' },
      { id: '1', title: 'GM' }
    ];

    this.activeStaus = [
      { id: '0', title: 'Active' },
      { id: '1', title: 'InActive' }
    ];
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }





  getBrandsMasterData() {
    setTimeout(() => {
      this.purchaseService.getEveryBrand().subscribe(data => {
        this.masterBrandData = data;
      });
    }, 400);
  }


  onCategorySelect(event) {

    this.selectedCategoryIdArray.push(event.id);
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
    // this.purchaseService.getAllBrand(event.id, '0').subscribe(data => {
    //   console.log('********', data);
    //   this.selectedCategory = data;
    //   this.dataSource = new MatTableDataSource(this.selectedCategory);
    // });

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

    const index = this.selectedCategoryIdArray.indexOf(event.id);
    if (index > -1) {
      this.selectedCategoryIdArray.splice(index, 1);
    }
  }

  onCategorySelectAll(event) {
    console.log('select all', event);
  }
  onCategoryDeSelectAll(event) {
    console.log('disselect all', event);
  }




  onSubCategorySelect(event, data) {
    // this.subCategoriesArray.push(subCategory.id);
    // console.log('sub categorys', event.id);

    this.selectedSubCategoryIdArray.push(event.id);

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
      this.uniqueBrandNamesArray = this.createUniqueBrandName(this.catchMappedData);
      this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
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
    this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
    this.dataSource.paginator = this.paginator;


    const subCategoryIndex = this.selectedSubCategoryIdArray.indexOf(event.id);
    if (subCategoryIndex > -1) {
      this.selectedSubCategoryIdArray.splice(subCategoryIndex, 1);
    }

  }


  onBrandSelect(event) {
    this.selectedBrandIdArray.push(event.BrandID);
    if (this.finalBrandArray.length === 0) {
      let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName
      });
      this.finalBrandArray = filteredBrandArray;
      this.dataSource = new MatTableDataSource(this.finalBrandArray);
      this.dataSource.paginator = this.paginator;
    }
    else {
      this.brands1 = this.multipleBrandArray.filter(function (item) {
        return item.BrandName.trim() === event.BrandName
      });
      this.brands2 = this.brands1;
      this.brands3 = [...this.finalBrandArray, ...this.brands2];
      this.finalBrandArray = this.brands3;
      this.dataSource = new MatTableDataSource(this.finalBrandArray);
      this.dataSource.paginator = this.paginator;
    }
  }

  onBrandDeSelect(event) {
    var tempArr = this.finalBrandArray.filter(function (item) {
      return item.BrandName.trim() != event.BrandName.trim();
    });
    this.finalBrandArray = tempArr;
    this.dataSource = new MatTableDataSource(this.finalBrandArray);
    this.dataSource.paginator = this.paginator;

    const brandIndex = this.selectedBrandIdArray.indexOf(event.BrandID);
    if (brandIndex > -1) {
      this.selectedBrandIdArray.splice(brandIndex, 1);
    }
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
      this.dataSource = new MatTableDataSource(unSelectedSubCategoryArray);
      this.dataSource.paginator = this.paginator;
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
          this.dataSource = new MatTableDataSource(this.finalBrandArray);
          this.dataSource.paginator = this.paginator;
        }
        else {
          this.brands1 = this.multipleBrandArray.filter(function (item) {
            return item.BrandName.trim() === product.BrandName
          });
          this.brands2 = this.brands1;
          this.brands3 = [...this.finalBrandArray, ...this.brands2];
          this.finalBrandArray = this.brands3;
          this.dataSource = new MatTableDataSource(this.finalBrandArray);
          this.dataSource.paginator = this.paginator;
        }

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

  // editPriceList(element) {
  //   if (element.priceListId) {
  //     console.log('got priceList Id');
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
  //     console.log('not get priceList Id');
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

  // getPriceListData() {
  //   this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
  //     this.dbData = data;
  //   });
  // }

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
  //     console.log('multiple amount');
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

  createUniqueBrandName(array: any) {
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
  // this.empForm.get('profile')

  saveItemMaster() {

    if (this.itemMasterData) {
      this.itemMaster.itemMasterId = Number(this.itemMasterData.ItemMasterId);
    }
    else {
      this.itemMaster.itemMasterId = 0;
    }

    if (this.itemMaster.productName === null || this.itemMaster.productName === undefined || this.itemMaster.productName === '') {
      this.itemMaster.productName = 'NULL';
    }

    if (this.itemMaster.underGroup === null || this.itemMaster.underGroup === undefined || this.itemMaster.underGroup === '') {
      this.itemMaster.underGroup = 'NULL';
    }
    if (this.itemMaster.barCode === null || this.itemMaster.barCode === undefined || this.itemMaster.barCode === '') {
      this.itemMaster.barCode = 'NULL';
    }

    if (this.itemMaster.gstClassification === null || this.itemMaster.gstClassification === undefined || this.itemMaster.gstClassification === '') {
      this.itemMaster.gstClassification = 'NULL';
    }

    if (this.itemMaster.activeStatus === null || this.itemMaster.activeStatus === undefined || this.itemMaster.activeStatus === '') {
      this.itemMaster.activeStatus = 'NULL';
    }

    if (this.itemMaster.purchaseDescription === null || this.itemMaster.purchaseDescription === undefined || this.itemMaster.purchaseDescription === '') {
      this.itemMaster.purchaseDescription = 'NULL';
    }

    if (this.itemMaster.purchaseMeasureMentUnit === null || this.itemMaster.purchaseMeasureMentUnit === undefined || this.itemMaster.purchaseMeasureMentUnit === '') {
      this.itemMaster.purchaseMeasureMentUnit = 'NULL';
    }


    if (this.itemMaster.purchaseVarient === null || this.itemMaster.purchaseVarient === undefined || this.itemMaster.purchaseVarient === '') {
      this.itemMaster.purchaseVarient = 'NULL';
    }


    if (this.itemMaster.purchasePrice === null || this.itemMaster.purchasePrice === undefined) {
      this.itemMaster.purchasePrice = 0;
    }

    if (this.itemMaster.purchaseDiscount === null || this.itemMaster.purchaseDiscount === undefined) {
      this.itemMaster.purchaseDiscount = 0;
    }

    if (this.itemMaster.finalPurchasePrice === null || this.itemMaster.finalPurchasePrice === undefined) {
      this.itemMaster.finalPurchasePrice = 0;
    }

    if (this.itemMaster.sellingDescription === null || this.itemMaster.sellingDescription === undefined || this.itemMaster.sellingDescription === '') {
      this.itemMaster.sellingDescription = 'NULL';
    }

    if (this.itemMaster.sellingMeasurementUnit === null || this.itemMaster.sellingMeasurementUnit === undefined || this.itemMaster.sellingMeasurementUnit === '') {
      this.itemMaster.sellingMeasurementUnit = 'NULL';
    }

    if (this.itemMaster.sellingVarient === null || this.itemMaster.sellingVarient === undefined || this.itemMaster.sellingVarient === '') {
      this.itemMaster.sellingVarient = 'NULL';
    }

    if (this.itemMaster.sellingPrice === null || this.itemMaster.sellingPrice === undefined) {
      this.itemMaster.sellingPrice = 0;
    }

    if (this.itemMaster.sellingDiscount === null || this.itemMaster.sellingDescription === undefined || this.itemMaster.sellingDescription === '') {
      this.itemMaster.sellingDiscount = 0;
    }

    if (this.itemMaster.finalSellingPrice === null || this.itemMaster.finalSellingPrice === undefined) {
      this.itemMaster.finalSellingPrice = 0;
    }

    if (this.itemMaster.minimumLevel === null || this.itemMaster.minimumLevel === undefined || this.itemMaster.minimumLevel === '') {
      this.itemMaster.minimumLevel = 'NULL';
    }

    if (this.itemMaster.itemType === null || this.itemMaster.itemType === undefined || this.itemMaster.itemType === '') {
      this.itemMaster.itemType = 'NULL';
    }

    if (this.itemMaster.serialTracking === null || this.itemMaster.serialTracking === undefined || this.itemMaster.serialTracking === '') {
      this.itemMaster.serialTracking = 'NULL';
    }


    let categoriesValue = this.saveItemMasterForm.get('categories');


    let subCategoriesValue = this.saveItemMasterForm.get('subCategories');
    let brandValue = this.saveItemMasterForm.get('brand');

    if (categoriesValue.value === undefined) {
      this.itemMaster.categoryId = 'NULL';
    } else {
      let categoryStr = '';
      categoryStr = this.selectedCategoryIdArray.toString();

      this.itemMaster.categoryId = categoryStr;
    }

    if (subCategoriesValue.value === undefined) {
      this.itemMaster.subCategoryId = 'NULL';
    }
    else {
      let subCategorystr = '';
      subCategorystr = this.selectedSubCategoryIdArray.toString();

      this.itemMaster.subCategoryId = subCategorystr;
    }

    if (brandValue.value === undefined) {
      this.itemMaster.brandId = 'NULL';
    } else {

      let brandStr = '';
      brandStr = this.selectedBrandIdArray.toString();

      this.itemMaster.brandId = brandStr;
    }

    let purchaseCalculation = Number(this.itemMaster.purchasePrice - this.itemMaster.purchaseDiscount) === Number(this.itemMaster.finalPurchasePrice);
    let sellingCalculation = Number(this.itemMaster.sellingPrice - this.itemMaster.sellingDiscount) === Number(this.itemMaster.finalSellingPrice);
    
    if (!purchaseCalculation) {
      this.toastr.error('Check Purchase Amount Calculation');
      return;
    }
    if (!sellingCalculation) {
      this.toastr.error('Check Selling Amount Calculation');
      return;
    }

    this.inventoryService.saveItemMaster(this.itemMaster).subscribe(data => {

      this.toastr.success('Item Saved');
      this.emitterService.isItemCreated.emit(true);
      this.dialogRef.close();
    });

  }

  defaultValues() {
    this.itemMaster.productName = 'productName';
    this.itemMaster.underGroup = 'underGroup';
    this.itemMaster.barCode = 'barCode';
    this.itemMaster.gstClassification = 'gstClassification';
    this.itemMaster.purchaseDescription = 'purchaseDescription';
    this.itemMaster.purchaseVarient = 'purchaseVarient';
    this.itemMaster.purchasePrice = 100;
    this.itemMaster.purchaseDiscount = 2;
    this.itemMaster.finalPurchasePrice = 98;
    this.itemMaster.sellingDescription = 'sellingDescription';
    this.itemMaster.sellingVarient = 'sellingVarient';
    this.itemMaster.sellingPrice = 102;
    this.itemMaster.sellingDiscount = 1;
    this.itemMaster.finalSellingPrice = 101;
    this.itemMaster.itemType = 'itemType';
    this.itemMaster.minimumLevel = 'minimumLevel';
    this.itemMaster.serialTracking = 'serialTracking';
  }

  assignValues() {
    this.itemMaster.productName = this.itemMasterData.ProductName;
    this.itemMaster.underGroup = this.itemMasterData.UnderGroup;
    this.itemMaster.barCode = this.itemMasterData.BarCode;
    this.itemMaster.gstClassification = this.itemMasterData.GstClassification;
    this.itemMaster.purchaseDescription = this.itemMasterData.PurchaseDescription;
    this.itemMaster.purchaseVarient = this.itemMasterData.PurchaseVarient;
    this.itemMaster.purchaseMeasureMentUnit = this.itemMasterData.PurchaseMeasurementUnit;
    this.itemMaster.sellingMeasurementUnit = this.itemMasterData.SellingMeasurementUnit;
    this.itemMaster.activeStatus = this.itemMasterData.ActiveStatus;
    this.itemMaster.purchasePrice = this.itemMasterData.PurchasePrice;
    this.itemMaster.purchaseDiscount = this.itemMasterData.PurchaseDiscount;
    this.itemMaster.finalPurchasePrice = this.itemMasterData.FinalPurchasePrice;
    this.itemMaster.sellingDescription = this.itemMasterData.SellingDescription;
    this.itemMaster.sellingVarient = this.itemMasterData.SellingVarient;
    this.itemMaster.sellingPrice = this.itemMasterData.SellingPrice;
    this.itemMaster.sellingDiscount = this.itemMasterData.SellingDiscount;
    this.itemMaster.finalSellingPrice = this.itemMasterData.FinalSellingPrice;
    this.itemMaster.itemType = this.itemMasterData.ItemType;
    this.itemMaster.minimumLevel = this.itemMasterData.MinimumLevel;
    this.itemMaster.serialTracking = this.itemMasterData.SerialTracking;
  }

  measurementUnitData() {
    this.inventoryService.getMeasurementUnitData().subscribe(data => {
      this.measurementUnitArray = data;
    });
  }

}
