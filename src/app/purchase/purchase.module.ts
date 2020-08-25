import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



import { VendorComponent } from './vendor/vendor.component';
import { PriceListComponent } from './price-list/price-list.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { GoodsReceiptNotesComponent } from './goods-receipt-notes/goods-receipt-notes.component';
import { PurchaseBillComponent } from './purchase-bill/purchase-bill.component';
import { PurchaseCreditNoteComponent } from './purchase-credit-note/purchase-credit-note.component';
import { PurchaseDebitNoteComponent } from './purchase-debit-note/purchase-debit-note.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { PaymentDunesComponent } from './payment-dunes/payment-dunes.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import { DialogContentVendorComponent } from './dialog-content-vendor/dialog-content-vendor.component';
import { DialogContentPriceListComponent } from './dialog-content-price-list/dialog-content-price-list.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

import { ToastrModule } from 'ngx-toastr';
import { AddAddressComponent } from './add-address/add-address.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MyPipePipe } from './my-pipe.pipe';
import { NgxPrintModule } from 'ngx-print';

import { GetPriceListComponent } from './get-price-list/get-price-list.component';
import { PurchaseReportsComponent } from './purchase-reports/purchase-reports.component';
import { DialogPurchaseReportsComponent } from './dialog-purchase-reports/dialog-purchase-reports.component';
import { DialogPurchaseOrderPrintComponent } from './dialog-purchase-order-print/dialog-purchase-order-print.component';
import { DialogOrderComponent } from './dialog-order/dialog-order.component';

@NgModule({
  declarations: [VendorComponent, PriceListComponent, PurchaseOrderComponent, GoodsReceiptNotesComponent, PurchaseBillComponent,
    PurchaseCreditNoteComponent, PurchaseDebitNoteComponent, PurchaseReturnComponent, BillPaymentComponent, PaymentDunesComponent,
    OnlinePaymentComponent, DialogContentVendorComponent, DialogContentPriceListComponent, AddAddressComponent, DashboardComponent,
    AddressDetailsComponent, MyPipePipe, GetPriceListComponent, PurchaseReportsComponent, DialogPurchaseReportsComponent, DialogPurchaseOrderPrintComponent, DialogOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 23,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ],
  entryComponents: [
    DialogContentVendorComponent, AddAddressComponent
  ],
  exports: [VendorComponent, MyPipePipe, PriceListComponent, GetPriceListComponent, PurchaseOrderComponent, AddressDetailsComponent, GoodsReceiptNotesComponent, DashboardComponent, PurchaseBillComponent, PurchaseCreditNoteComponent, PurchaseDebitNoteComponent, PurchaseReturnComponent, BillPaymentComponent, PaymentDunesComponent, OnlinePaymentComponent, AddAddressComponent]
})
export class PurchaseModule { }
