import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyProductsService } from '../buy-products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { EmitterService } from 'src/shared/emitter.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditMyOrder } from '../buy-products.model';



@Component({
  selector: 'app-dialog-my-orders-edit',
  templateUrl: './dialog-my-orders-edit.component.html',
  styleUrls: ['./dialog-my-orders-edit.component.css']
})
export class DialogMyOrdersEditComponent implements OnInit {
  PurchaseProductId: number;


  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select', 'name', 'quantity', 'mrp', 'discount', 'finalPrice', 'requiredQuantity'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  updateAllRecordsCount = 0;
  dataSource: any;
  checkFinalPrice: boolean;
  isActive: boolean;
  multipleEntriesArray: any = [];
  uniquePurchaseOrderItemArray: any = [];
  multipleEntries: any = [];
  myOrdersData: any = [];

  totalMRP = 0;
  totalDiscount = 0;
  totalItemsOrdered = 0;
  totalPayableAmount = 0;
  youSaved = 0;

  customerName: string;
  vendorName: string;
  mobileNumber: string;
  paymentType: string;
  orderDate: string;
  deliveryTime: string;
  deliveryType: string;
  houseNo: string;
  landMark: string;
  area: string;
  city: string;
  orderNo: string;

  editMyOrder: EditMyOrder = new EditMyOrder();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogMyOrdersEditComponent>,
    public buyProductsService: BuyProductsService,
    public toastr: ToastrService,
    public emitterService: EmitterService,
    public router: Router,
    public route: ActivatedRoute,
  ) {

    this.PurchaseProductId = data;
    this.buyProductsService.getAllOrdersDataByPurchaseProductId(this.PurchaseProductId).subscribe(data => {
      console.log('received data', data);
      this.myOrdersData = data;
      this.dataSource = new MatTableDataSource(this.myOrdersData);
      this.dataSource.paginator = this.paginator;



      this.orderNo = this.myOrdersData[0].OrderNo;
      this.customerName = this.myOrdersData[0].customerName;

      this.vendorName = this.myOrdersData[0].VendorName;
      this.mobileNumber = this.myOrdersData[0].mobileNumber;

      this.paymentType = this.myOrdersData[0].PaymentType;
      this.orderDate = this.myOrdersData[0].OrderDate;

      this.deliveryTime = this.myOrdersData[0].DeliveryTime;
      this.deliveryType = this.myOrdersData[0].DeliveryType;

      this.houseNo = this.myOrdersData[0].houseNO;
      this.landMark = this.myOrdersData[0].landmark;

      this.area = this.myOrdersData[0].area;
      this.city = this.myOrdersData[0].city;

      this.payableCalculation(this.myOrdersData);


    });

  }

  ngOnInit(): void {
  }


  payableCalculation(arr) {

    this.totalMRP = 0;
    this.totalDiscount = 0;
    this.totalItemsOrdered = 0;
    this.totalPayableAmount = 0;
    for (let i = 0; i < arr.length; i++) {
      this.totalMRP += Number(arr[i].MRP) * Number(arr[i].RequiredQuantity);
      this.totalDiscount += Number(arr[i].Discount) * Number(arr[i].RequiredQuantity);
      this.totalItemsOrdered += Number(arr[i].RequiredQuantity);
      // this.totalFinalPrice += arr[i].FinalPrice;
    }
    this.totalPayableAmount = this.totalMRP - this.totalDiscount;
    

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


  onChange(event) {
    if (event.checked === true) {
      this.updateAllRecordsCount++;
    }
    else {
      this.updateAllRecordsCount--;
    }
  }



  updateAll() {
    this.checkFinalPrice = true;
    this.selection.selected.forEach((element) => {
      if (this.checkFinalPrice === false) {
        return;
      }

      this.checkFinalPrice = this.checkItemFinalPrice(element);
      if (!this.checkFinalPrice) {
        this.toastr.error('Please Check Quantity');
      }
    });
    if (this.checkFinalPrice) {
      this.selection.selected.forEach((element) => {
        this.multipleEntriesArray.push(element);
        this.uniquePurchaseOrderItemArray = this.uniqueEntries(this.multipleEntriesArray, element);
        this.isActive = false;
      });
      this.postMultipleInsertion(this.uniquePurchaseOrderItemArray);
    }
  }
  uniqueEntries(arr, obj) {
    let isExist = arr.some(o => Number(o.ProductId) === Number(obj.ProductId) && Number(o.id) === Number(obj.id)
      && Number(o.PurchaseProductsItemId) === Number(obj.PurchaseProductsItemId));
    if (!isExist)
      arr.push(obj);
    return arr;
  }


  checkItemFinalPrice(element) {

    console.log('checking quantity', element);
    let isRecordValid: boolean = true;

    let requiredQuantity = Number(element.RequiredQuantity);
    let availableQuantity = Number(element.Quantity);

    if ((Number(requiredQuantity) < 1) || (Number(requiredQuantity) > Number(availableQuantity))) {
      isRecordValid = false;
    }
    else {
      if ((Number(requiredQuantity) >= 1) || (Number(requiredQuantity) < Number(availableQuantity))) {
        isRecordValid = true;
      }
    }
    return isRecordValid;
  }


  postMultipleInsertion(elements) {
    elements.forEach(element => {
      console.log('add to edit model', element);


      this.editMyOrder = new EditMyOrder();
      // this.edit = new OrderedItems();


      this.editMyOrder.Discount = Number(element.Discount);
      this.editMyOrder.FinalPrice = Number(element.FinalPrice);
      this.editMyOrder.MRP = Number(element.MRP);
      this.editMyOrder.Quantity = Number(element.Quantity);
      // this.editMyOrder.MRP = Number(element.MRP);
      this.editMyOrder.RequiredQuantity = Number(element.RequiredQuantity);
      this.editMyOrder.Unit = element.Unit;
      // this.editMyOrder.RequiredQuantity = Number(element.RequiredQuantity);
      this.editMyOrder.name = element.name;
      this.editMyOrder.PurchaseProductId = element.PurchaseProductId;
      this.editMyOrder.PurchaseProductsItemId = element.PurchaseProductsItemId;


      this.multipleEntries.push(this.editMyOrder);

    });
    console.log('added items to edit', this.multipleEntries);

    let prevStorageArray: any = [];
    let finalStorageArray: any = [];

    this.buyProductsService.updateOrdersData(this.multipleEntries).subscribe(data => {
      console.log('data inserted', data);
      this.toastr.success('Records Updated Succesfully');
      this.updateAllRecordsCount = 0;
      this.selection.clear();
      this.multipleEntriesArray = [];
      this.multipleEntries = [];
      this.dialogRef.close();
    });
    // finalStorageArray = this.multipleEntries;
    // prevStorageArray = JSON.parse(sessionStorage.getItem('cart_items'));
    // console.log('prevStorageArray ', prevStorageArray);
    // finalStorageArray = this.mergeOrderItems(prevStorageArray, this.multipleEntries);
    // sessionStorage.removeItem('cart_items');
    // sessionStorage.setItem('cart_items', JSON.stringify(finalStorageArray));
    // console.log('finalStorageArray ', finalStorageArray);
    // this.payableCalculation(finalStorageArray);

    // this.emitterService.isProductIsAddedOrRemoved.emit(true);

    // this.router.navigate(['buyProducts/goToCart']);
  }

}
