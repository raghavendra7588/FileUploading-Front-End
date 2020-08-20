import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrder, PurchaseOrderData, PurchaseOrderItem } from '../purchase.model';
import { GetPriceListComponent } from '../get-price-list/get-price-list.component';
import { PurchaseService } from '../purchase.service';
import { EmitterService } from 'src/shared/emitter.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

  displayedColumns: string[] = ['productId', 'brandName', 'productName', 'quantity', 'buyingPrice', 'discount', 'finalPrice', 'availableQuantity'];
  dataSource: any;

  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  purchaseOrderData: PurchaseOrderData = new PurchaseOrderData();
  purchaseOrderItem: PurchaseOrderItem = new PurchaseOrderItem();
  purchaseOrderForm: FormGroup;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  vendorData: any = [];
  addressData: any = [];

  priceListData: any = [];
  sellerId: any;
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];
  selectedVendor: any;
  minDate: Date;
  receivedPurchaseOrder: any = [];
  purchaseOrderListData: any = [];
  multiplePurchaseOrderData: any = [];
  billingId: any;
  shippingId: any;
  vendorId: any;
  grandTotal: any;

  constructor(public dialog: MatDialog, public purchaseService: PurchaseService, public emitterService: EmitterService, public toastr: ToastrService) {
    this.emitterService.sendPurchaseOrder.subscribe(value => {
      if (value) {
        this.receivedPurchaseOrder = [...this.receivedPurchaseOrder, ...value];
        this.grandTotal = this.receivedPurchaseOrder.map(o => o.finalPrice).reduce((a, c) => { return a + c });
        console.log('this is array', this.receivedPurchaseOrder);
        this.dataSource = new MatTableDataSource(this.receivedPurchaseOrder);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngOnInit() {
    this.purchaseOrder.orderDate = new Date();
    this.getVendorData();
    this.getAddressData();
    this.sellerId = Number(localStorage.getItem('sellerId'));
    this.priceListData = this.purchaseService.getAllPriceListData(this.sellerId);
    this.minDate = new Date();
  }

  getVendorData() {
    this.purchaseService.getAllVendorData().subscribe(data => {
      this.vendorData = data;
    });
  }

  openDialog() {
    this.dialog.open(GetPriceListComponent, {
      height: '600px',
      width: '1000px'
    });
  }


  selectedVendorFromList(item) {
    this.vendorId = item.vendorId;

    this.purchaseOrder.email = item.email;
    this.purchaseOrder.agent = item.agentBroker;
    this.purchaseOrder.gstType = item.gstCategory;
  }

  selectedBillingAddress(address) {
    this.billingId = address.id;
    this.purchaseOrder.billingAddress = address.billing_address;
    this.purchaseOrder.billingCity = address.billing_city;
    this.purchaseOrder.billingPhone = address.billing_phone;
  }

  selectedShippingAddress(address) {
    this.shippingId = address.id;
    this.purchaseOrder.shippingAddress = address.shipping_address;
    this.purchaseOrder.shippingCity = address.shipping_city;
    this.purchaseOrder.shippingPhone = address.shipping_phone;
  }

  getAddressData() {
    this.purchaseService.getAddressData().subscribe(data => {
      this.addressData = data;
    });
  }

  getPurchaseOrderList(data: any) {
    // console.log('I received purchase Order', data);
  }


  mapObj(apiData, ownDbData) {
    for (let i = 0; i < apiData.length; i++) {
      apiData[i].ProductPrice = 0;
      apiData[i].Discount = 0;
      apiData[i].FinalPrice = 0;
      apiData[i].AvailableQuantity = 0;
      for (let j = 0; j < ownDbData.length; j++) {
        if (apiData[i].ProductID === ownDbData[j].productId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
          apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
          apiData[i].Discount = ownDbData[j].Discount;
          apiData[i].FinalPrice = ownDbData[j].FinalPrice;
          apiData[i].AvailableQuantity = ownDbData[j].availableQuantity;
        }
      }
    }
    return apiData;
  }


  savePurchaseOrder() {
    this.purchaseOrderData.VendorId = this.vendorId;
    this.purchaseOrderData.SellerId = this.sellerId;
    this.purchaseOrderData.OrderNo = this.purchaseOrder.orderNo.toString();
    let orderDate = this.convertDate(this.purchaseOrder.orderDate);
    let deliveryDate = this.convertDate(this.purchaseOrder.deliveryDate);
    this.purchaseOrderData.OrderDate = orderDate;
    this.purchaseOrderData.DeliveryDate = deliveryDate;
    this.purchaseOrderData.ReferenceNo = this.purchaseOrder.referenceNo.toString();
    this.purchaseOrderData.BillingId = this.billingId;
    this.purchaseOrderData.ShippingId = this.shippingId;
    this.purchaseOrderData.Remarks = this.purchaseOrder.remarks;
    this.purchaseOrderData.ItemValue = this.purchaseOrder.itemValue.toString();
    this.purchaseOrderData.TaxAmount = this.purchaseOrder.taxAmount.toString();
    this.purchaseOrderData.Taxable = this.purchaseOrder.taxable.toString();
    this.purchaseOrderData.CESSAmount = this.purchaseOrder.cessAmount.toString();
    this.purchaseOrderData.DocAmount = this.purchaseOrder.docAmount.toString();
    this.purchaseOrderData.AdvanceAmount = this.purchaseOrder.advanceAmount.toString();
    this.purchaseOrderData.AdvanceLedger = this.purchaseOrder.advanceLedger.toString();
    this.purchaseOrderData.items = this.receivedPurchaseOrder;
    this.purchaseService.savePurchaseOrderMaster(this.purchaseOrderData).subscribe(data => {
      this.toastr.success('order is placed');
      this.clearValues();
      this.dataSource = [];
    });
  }
  savePurchaseOrderItem() {
    for (let i = 0; i < this.receivedPurchaseOrder.length; i++) {
      this.purchaseOrderItem = new PurchaseOrderItem();
      this.purchaseOrderItem.SellerId = this.sellerId;
      this.purchaseOrderItem.ProductId = this.receivedPurchaseOrder[i].productId;
      this.purchaseOrderItem.SubCategoryId = this.receivedPurchaseOrder[i].subCategoryId;
      this.purchaseOrderItem.BrandId = this.receivedPurchaseOrder[i].brandId;
      this.purchaseOrderItem.BuyingPrice = this.receivedPurchaseOrder[i].buyingPrice;
      this.purchaseOrderItem.FinalPrice = this.receivedPurchaseOrder[i].finalPrice;
      this.purchaseOrderItem.ReferenceId = this.receivedPurchaseOrder[i].ReferenceId;
      this.purchaseOrderItem.Discount = this.receivedPurchaseOrder[i].discount;
      this.purchaseOrderItem.PurchaseQuantity = this.receivedPurchaseOrder[i].availableQuantity;
      this.purchaseOrderItem.Quantity = this.receivedPurchaseOrder[i].quantity;
      this.purchaseOrderItem.ProductVarientId = this.receivedPurchaseOrder[i].ProductVarientId;

      this.multiplePurchaseOrderData.push(this.purchaseOrderItem);
    }
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

  clearValues() {
    this.purchaseOrder.vendor = '';
    this.purchaseOrder.gstType = '';
    this.purchaseOrder.email = '';
    this.purchaseOrder.agent = '';
    this.purchaseOrder.orderNo = 0;
    this.purchaseOrder.deliveryDate = undefined;
    this.purchaseOrder.referenceNo = 0;
    this.purchaseOrder.billingNameList = undefined;
    this.purchaseOrder.billingAddress = '';
    this.purchaseOrder.billingCity = '';
    this.purchaseOrder.billingPhone = '';
    this.purchaseOrder.shippingNameList = undefined;
    this.purchaseOrder.shippingAddress = '';
    this.purchaseOrder.shippingCity = '';
    this.purchaseOrder.shippingPhone = '';
    this.purchaseOrder.remarks = '';
    this.purchaseOrder.itemValue = 0;
    this.purchaseOrder.taxAmount = 0;
    this.purchaseOrder.taxable = 0;
    this.purchaseOrder.cessAmount = 0;
    this.purchaseOrder.docAmount = 0;
    this.purchaseOrder.advanceAmount = 0;
    this.purchaseOrder.advanceLedger = '';
  }

}
