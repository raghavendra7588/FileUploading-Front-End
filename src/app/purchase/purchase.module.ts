import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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





@NgModule({
  declarations: [VendorComponent, PriceListComponent, PurchaseOrderComponent, GoodsReceiptNotesComponent, PurchaseBillComponent, PurchaseCreditNoteComponent, PurchaseDebitNoteComponent, PurchaseReturnComponent, BillPaymentComponent, PaymentDunesComponent, OnlinePaymentComponent, DialogContentVendorComponent, DialogContentPriceListComponent],
  imports: [
    CommonModule,
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
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogContentVendorComponent
  ],
  exports: [VendorComponent, PriceListComponent, PurchaseOrderComponent, GoodsReceiptNotesComponent, PurchaseBillComponent, PurchaseCreditNoteComponent, PurchaseDebitNoteComponent, PurchaseReturnComponent, BillPaymentComponent, PaymentDunesComponent, OnlinePaymentComponent]
})
export class PurchaseModule { }
