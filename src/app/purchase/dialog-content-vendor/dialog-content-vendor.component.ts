import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { Vendor, Address } from '../purchase.model';
import { LoginService } from 'src/app/login/login.service';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmitterService } from 'src/shared/emitter.service';

@Component({
  selector: 'app-dialog-content-vendor',
  templateUrl: './dialog-content-vendor.component.html',
  styleUrls: ['./dialog-content-vendor.component.css'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class DialogContentVendorComponent implements OnInit, OnDestroy {

  panelOpenState = false;
  documents: any;
  labelPosition: 'before' = 'before';
  selectedTerm: any;
  selectedCategory: any;
  selectedTransporter: any;

  vendor: Vendor = new Vendor();
  paymentTerm: any;
  paymentCategory: any;
  transporters: any;
  subCategories: any = [];
  subProducts: any = [];
  selectedSubCategoriesId: any = [];
  getEveryBrandItem: any = [];
  filteredBrandItem: any = [];

  public multipleBrandArray: any = [];

  array1: any = [];
  array2: any = [];

  array3: any = [];
  fullDate: any;
  fileData: File = null;

  isFileUploaded: boolean = false;
  filename: string = null;
  subCategoriesArray: any = [];
  categoriesArray: any = [];
  brandArray: any = [];


  maxLengthGst = 15;
  maxLengthPan = 10;
  maxLengthAccountNumber = 18;
  maxLengthIfsc = 11;
  maxLengthCin = 21;
  maxLengthPinCode = 6;

  datePicker: any;
  formattedDate: any;
  parentid = 3;
  SubCategoryId: string;
  vendorData: any;
  isImageUploaded: boolean;
  isDateSelected: boolean;

  getAddressData: Address;

  multipleCategoriesArray: any = [];
  categoriesArray1: any = [];
  categoriesArray2: any = [];
  categoriesArray3: any = [];

  currentBillingId: string;
  currentShippingId: string;
  sellerId: string;
  storageSellerId: number;
  maxDate: any;
  uniqueBrandNamesArray: any = [];
  anyArray: any = [];
  subCategoryNamesArray: any = [];


  saveVendorForm: FormGroup;
  constructor(public purchaseService: PurchaseService, public loginService: LoginService,
    public toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any, public emitterService: EmitterService, public router: Router, public formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogContentVendorComponent>) {
    this.vendorData = data;


    this.saveVendorForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      code: [''],
      underLedger: [''],
      contactPerson: [''],
      PrintName: [''],
      category: [''],
      subCategory: [''],
      brand: [''],
      gst: [''],
      pan: [''],
      gstCategory: [''],
      datePicker: [''],
      distance: [''],
      cin: [''],
      paymentTerm: [''],
      priceCategory: [''],
      selectedTransporter: [''],
      agentBroker: [''],
      creditLimit: [''],
      ifscCode: [''],
      accountNumber: [''],
      bankName: [''],
      branch: [''],
      fileUpload: [''],
      address: [''],
      city: [''],
      state: [''],
      pinCode: [''],
      country: [''],
      phone: [''],
      email: ['']
    });

  }

  ngOnInit(): void {
    // this.assignData();
    this.getAddressDetails();
    this.loginService.seller_object.categories = JSON.parse(localStorage.getItem('categories'));
    // this.vendor.sellerId = this.loginService.seller_id;
    this.vendor.sellerId = localStorage.getItem('sellerId');
    this.sellerId = localStorage.getItem('sellerId');
    this.maxDate = new Date();

    this.paymentTerm = [
      { id: 0, title: 'Cash' },
      { id: 1, title: 'Credit' },
      { id: 2, title: 'Online' },
    ];

    this.paymentCategory = [
      { id: 0, title: 'Scheme' },
      { id: 1, title: 'Non Scheme' },
    ];

    this.transporters = [
      { id: 0, title: 'From Vendor' },
      { id: 1, title: 'Own' },
    ];
    this.isImageUploaded = false;

  }

  selectedBillingAddress(event, adr) {
    this.currentBillingId = adr.id.toString();
  }

  selectedShippingAddress(event, address) {
    this.currentShippingId = address.id.toString();
  }


  onCategoriesChange(event, category: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        console.log(category.id);

        this.categoriesArray.push(category.id);
        console.log('categories array ', this.categoriesArray);
        this.purchaseService.getAllSubCategories(category.id).subscribe(data => {
          // this.subCategories = data;

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
      console.log('categories array unselection', this.categoriesArray);
    }
  }

  onSubCategoriesChange(event, subCategory: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        this.subCategoriesArray.push(subCategory.id);
        console.log('sub categories array ', this.subCategoriesArray);
        this.purchaseService.getAllBrand(subCategory.parentid, subCategory.id).subscribe(data => {
          if (this.multipleBrandArray.length < 2 && this.array3 < 1) {
            this.multipleBrandArray = data;
          }
          else {
            this.array2 = data;
            this.array3 = [...this.multipleBrandArray, ...this.array2];
            this.multipleBrandArray = this.array3;
          }
          this.uniqueBrandNamesArray = this.createUniqueBrandName(this.multipleBrandArray);
          this.anyArray = this.sortUniqueBrandName(this.uniqueBrandNamesArray);
          this.subCategoryNamesArray = this.multipleBrandArray;
          console.log('))))) @@@@@@@@@@@', this.anyArray);

        });
      }
    }
    if (!event.source.selected) {
      var newArr = this.multipleBrandArray.filter(function (item) {
        return item.SubCategoryID != subCategory.id;
      });
      this.multipleBrandArray = newArr;
      const index = this.subCategoriesArray.indexOf(subCategory.id);
      if (index > -1) {
        this.subCategoriesArray.splice(index, 1);
      }
      console.log('sub categories array unselection', this.subCategoriesArray);
    }
  }

  onProductChange(event, product: any) {
    if (event.isUserInput) {
      if (event.source.selected) {
        // this.brandArray.push(product.ProductID);
        console.log('inside brand change ', product);

        let filteredBrandArray = this.multipleBrandArray.filter(function (item) {
          return item.BrandName.trim() === product
        });
        console.log('i selected brand Name', filteredBrandArray);
        this.brandArray.push(filteredBrandArray[0].BrandID);
        console.log('i pushed it', this.brandArray);
      }
      if (!event.source.selected) {
        console.log('i dis selected brand Name', product);
        const index = this.brandArray.indexOf(product.ProductID);
        if (index > -1) {
          this.brandArray.splice(index, 1);
        }
        console.log('brand array unselection', this.brandArray);
      }
    }
  }

  valueChanged() {
    let date = new Date(this.vendor.registrationDate);
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, "0")

    const day = `${date.getDate()}`.padStart(2, "0")

    const stringDate = [day, month, year].join("/");
    this.fullDate = stringDate;
    console.log('date changed', this.fullDate);
    return this.fullDate
  }

  selectedSubCategory() {
    console.log(this.vendor.subCategory);
  }


  onBrandChange() {
    console.log('inside brand');
  }

  selectePaymentTerm() {
    console.log(this.vendor.paymentTerm);

  }

  selectePriceCategory() {
    console.log(this.vendor.priceCategory);
  }

  selectedTransporterDetail() {
    console.log(this.vendor.transporter);
  }


  onFileSelect(e: any): void {

    this.fileData = <File>e.target.files[0];
    this.isFileUploaded = true;
    this.vendor.fileUpload = e.target.files[0].name;
    this.isImageUploaded = true;
  }


  saveVendor() {
    const formData = new FormData();

    if (this.vendorData) {
      formData.append('vendorId', this.vendorData.vendorId);
    }
    else {

      formData.append('vendorId', '0');
    }


    if (this.vendor.name === null || this.vendor.name === undefined || this.vendor.name === '') {
      formData.append('name', 'NULL');    //name
    }
    else {
      formData.append('name', this.vendor.name);
    }


    if (this.vendor.code === null || this.vendor.code === undefined || this.vendor.code === '') {
      formData.append('code', 'NULL');  //code
    }
    else {
      formData.append('code', this.vendor.code);
    }

    if (this.vendor.underLedger === null || this.vendor.underLedger === undefined || this.vendor.underLedger === '') {
      formData.append('underLedger', 'NULL');    //underLedger
    }
    else {
      formData.append('underLedger', this.vendor.underLedger);
    }

    if (this.vendor.contactPerson === null || this.vendor.contactPerson === undefined || this.vendor.contactPerson === '') {
      formData.append('contactPerson', 'NULL');   //contactPerson
    }
    else {
      formData.append('contactPerson', this.vendor.contactPerson);
    }


    if (this.vendor.printName === null || this.vendor.printName === undefined || this.vendor.printName === '') {
      formData.append('printName', 'NULL');      //printName
    }
    else {
      formData.append('printName', this.vendor.printName);
    }
    if (this.isImageUploaded) {
      console.log('you selected file');
      formData.append('File', this.fileData, this.vendor.fileUpload);

    }
    else {
      console.log('you didnt file');
      formData.append('File', "0", "0");
    }

    let SubCategorystr = '';
    this.subCategoriesArray.forEach(function (value) {
      SubCategorystr = SubCategorystr + value + ',';
    });

    let categoryStr = '';
    this.categoriesArray.forEach(function (value) {
      categoryStr = categoryStr + value + ',';
    });

    let brandStr = '';
    this.brandArray.forEach(function (value) {
      brandStr = brandStr + value + ',';
    });




    if (this.vendor.category === null || this.vendor.category === undefined || this.vendor.category === '') {
      formData.append('category', "NULL");    //category
    }
    else {

      formData.append('category', categoryStr);
    }
    if (this.vendor.subCategory === null || this.vendor.subCategory === undefined || this.vendor.subCategory === '') {
      formData.append('subCategory', "NULL");      //subCategory
    }
    else {

      formData.append('subCategory', SubCategorystr);
    }
    if (this.vendor.brand === null || this.vendor.brand === undefined || this.vendor.brand === '') {
      formData.append('brand', "NULL");      //brand
    }
    else {
      formData.append('brand', brandStr);
    }



    if (this.vendor.gst === null || this.vendor.gst === undefined || this.vendor.gst === '') {
      formData.append('gst', 'NULL');     //gst
    }
    else {
      formData.append('gst', this.vendor.gst);
    }

    if (this.vendor.gstCategory === null || this.vendor.gstCategory === undefined || this.vendor.gstCategory === '') {
      formData.append('gstCategory', 'NULL');      //gstCategory
    }
    else {
      formData.append('gstCategory', this.vendor.gstCategory);
    }


    if (this.vendor.pan === null || this.vendor.pan === undefined || this.vendor.pan === '') {
      formData.append('pan', 'NULL');     //pan
    }
    else {
      formData.append('pan', this.vendor.pan);
    }

    if (this.vendor.registrationDate === null || this.vendor.registrationDate === undefined) {
      formData.append('registrationDate', 'NULL');      //date
    }
    else {
      this.fullDate = this.valueChanged();
      formData.append('registrationDate', this.fullDate.toString());
    }

    if (this.vendor.distance === null || this.vendor.distance === undefined || this.vendor.distance === '') {
      formData.append('distance', 'NULL');    //distance
    }
    else {
      formData.append('distance', this.vendor.distance);
    }

    if (this.vendor.cin === null || this.vendor.cin === undefined) {
      formData.append('cin', "0");  //cin
    }
    else {
      formData.append('cin', this.vendor.cin.toString());
    }

    if (this.vendor.paymentTerm === null || this.vendor.paymentTerm === undefined || this.vendor.paymentTerm === '') {
      formData.append('paymentTeam', "0");      //paymentTerm
    }
    else {
      formData.append('paymentTeam', this.vendor.paymentTerm);
    }


    if (this.vendor.priceCategory === null || this.vendor.priceCategory === undefined || this.vendor.priceCategory === '') {
      formData.append('priceCategory', 'NULL');     //priceCategory
    }
    else {
      formData.append('priceCategory', this.vendor.priceCategory);
    }


    if (this.vendor.transporter === null || this.vendor.transporter === undefined || this.vendor.transporter === '') {
      formData.append('transporter', 'NULL');     //transporter
    }
    else {
      formData.append('transporter', this.vendor.transporter);
    }


    if (this.vendor.agentBroker === null || this.vendor.agentBroker === undefined || this.vendor.agentBroker === '') {
      formData.append('agentBroker', 'NULL');   //agent Broker
    }
    else {
      formData.append('agentBroker', this.vendor.agentBroker);
    }


    if (this.vendor.agentBroker === null || this.vendor.creditLimit === undefined) {
      formData.append('creditLimit', "0");    //credit limit
    }
    else {
      formData.append('creditLimit', this.vendor.creditLimit.toString());
    }


    if (this.vendor.ifscCode === null || this.vendor.ifscCode === undefined) {
      formData.append('ifscCode', 'NULL');      //ifscCode
    }
    else {
      formData.append('ifscCode', this.vendor.ifscCode.toString());
    }


    if (this.vendor.bankName === null || this.vendor.bankName === undefined || this.vendor.bankName === '') {
      formData.append('bankName', 'NULL');      //bankName
    }
    else {
      formData.append('bankName', this.vendor.bankName);
    }


    if (this.vendor.branch === null || this.vendor.branch === undefined || this.vendor.branch === '') {
      formData.append('branch', 'NULL');    //branch
    }
    else {
      formData.append('branch', this.vendor.branch);
    }


    if (this.vendor.accountNumber === null || this.vendor.accountNumber === undefined) {
      formData.append('accountNumber', "0"); //accountNumber
    }
    else {
      formData.append('accountNumber', this.vendor.accountNumber.toString());
    }



    if (this.vendor.Address === null || this.vendor.Address === undefined || this.vendor.Address === '') {
      formData.append('address', 'NULL');    //address
    }
    else {
      formData.append('address', this.vendor.Address);
    }



    if (this.vendor.City === null || this.vendor.City === undefined || this.vendor.City === '') {

      formData.append('city', 'NULL');      //city
    }
    else {
      formData.append('city', this.vendor.City);
    }

    if (this.vendor.State === null || this.vendor.State === undefined || this.vendor.State === '') {

      formData.append('state', 'NULL');      //state
    }
    else {
      formData.append('state', this.vendor.State);
    }


    if (this.vendor.PinCode === null || this.vendor.PinCode === undefined || this.vendor.PinCode === '') {

      formData.append('pinCode', 'NULL');     //pinCode
    }
    else {
      formData.append('pinCode', this.vendor.PinCode);
    }

    if (this.vendor.Country === null || this.vendor.Country === undefined || this.vendor.Country === '') {

      formData.append('country', 'NULL');     //country
    }
    else {
      formData.append('country', this.vendor.Country);
    }

    if (this.vendor.Phone === null || this.vendor.Phone === undefined || this.vendor.Phone === '') {
      formData.append('phone', 'NULL');     //phone
    }
    else {
      formData.append('phone', this.vendor.Phone);
    }

    if (this.vendor.Email === null || this.vendor.Email === undefined || this.vendor.Email === '') {
      formData.append('email', 'NULL');    //email
    }
    else {
      formData.append('email', this.vendor.Email);

    }

    // formData.append('gst', this.vendor.gst);
    // formData.append('gstCategory', this.vendor.gstCategory);
    // formData.append('pan', this.vendor.pan);
    // this.fullDate = this.valueChanged();
    // formData.append('registrationDate', this.fullDate.toString());
    // formData.append('distance', this.vendor.distance);
    // formData.append('cin', this.vendor.cin.toString());



    // formData.append('paymentTeam', this.vendor.paymentTerm);
    // formData.append('priceCategory', this.vendor.priceCategory);
    // formData.append('transporter', this.vendor.transporter);
    // formData.append('agentBroker', this.vendor.agentBroker);
    // formData.append('creditLimit', this.vendor.creditLimit.toString());
    // formData.append('ifscCode', this.vendor.ifscCode.toString());
    // formData.append('accountNumber', this.vendor.accountNumber.toString());
    // formData.append('bankName', this.vendor.bankName);
    // formData.append('branch', this.vendor.branch);
    // formData.append('sellerId', this.vendor.sellerId);

    // formData.append('address', this.vendor.Address);
    // formData.append('city', this.vendor.City);
    // formData.append('state', this.vendor.State);

    // formData.append('pinCode', this.vendor.PinCode);
    // formData.append('country', this.vendor.Country);
    // formData.append('phone', this.vendor.Phone);

    // formData.append('email', this.vendor.Email);
    // this.vendor.sellerId = localStorage.getItem('sellerId');
    formData.append('sellerId', this.vendor.sellerId);
    this.purchaseService.saveVendorMaster(formData).subscribe(data => {
      console.log(data);
      this.toastr.success('Vendor added Successfully!');
      this.emitterService.isVendorMasterUpdated.emit(true);
      this.dialogRef.close();

    });

  }

  assignData() {
    if (this.vendorData) {

      this.vendor.code = this.vendorData.code;
      this.vendor.underLedger = this.vendorData.underLedger;
      this.vendor.name = this.vendorData.name;
      this.vendor.contactPerson = this.vendorData.contactPerson;
      this.vendor.printName = this.vendorData.printName;
      this.vendor.gst = this.vendorData.gst;
      this.vendor.gstCategory = this.vendorData.gstCategory;
      this.vendor.pan = this.vendorData.pan;
      this.vendor.distance = this.vendorData.distance;
      this.vendor.cin = this.vendorData.cin;
      this.vendor.fileUpload = this.vendorData.fileUpload;
      // this.vendor.billing_address = this.vendorData.billing_address;

      this.vendor.paymentTerm = this.vendorData.paymentTeam;
      this.vendor.priceCategory = this.vendorData.priceCategory;
      this.vendor.transporter = this.vendorData.transporter;
      this.vendor.registrationDate = this.vendorData.registrationDate;

      let anyDate: any;
      anyDate = this.vendorData.registrationDate;
      const date = new Date(anyDate);
      this.vendor.registrationDate = date;

      // this.vendor.shipping_address = this.vendorData.shipping_address;

      this.vendor.agentBroker = this.vendorData.agentBroker;
      this.vendor.creditLimit = this.vendorData.creditLimit;
      this.vendor.ifscCode = this.vendorData.ifscCode;
      this.vendor.accountNumber = this.vendorData.accountNumber;
      this.vendor.bankName = this.vendorData.bankName;
      this.vendor.branch = this.vendorData.branch;
    }
    else {

      this.vendor.code = 'sample code';
      this.vendor.underLedger = 'underLedger';
      this.vendor.name = 'testUser';
      this.vendor.contactPerson = 'xyz';
      this.vendor.printName = 'testUser';
      this.vendor.gst = '1111';
      this.vendor.gstCategory = 'ABC';
      this.vendor.pan = 'CJVP1111112L';
      this.vendor.distance = '200';
      this.vendor.cin = 11;
      this.vendor.agentBroker = 'agent broker';
      this.vendor.creditLimit = 100000;
      this.vendor.ifscCode = 121212;
      this.vendor.accountNumber = 78273839;
      this.vendor.bankName = 'SBI';
      this.vendor.branch = 'SamarthNagar';
    }

  }

  getAddressDetails() {
    this.purchaseService.getAddressData().subscribe(data => {
      this.getAddressData = data;
      console.log('address Details ', this.getAddressData);
    });
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
  ngOnDestroy() {
    this.isImageUploaded = false;
  }

}
