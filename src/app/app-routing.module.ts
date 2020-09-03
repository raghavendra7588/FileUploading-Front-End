import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './purchase/dashboard/dashboard.component';
import { VendorComponent } from './purchase/vendor/vendor.component';
import { PriceListComponent } from './purchase/price-list/price-list.component';
import { PurchaseOrderComponent } from './purchase/purchase-order/purchase-order.component';
import { GoodsReceiptNotesComponent } from './purchase/goods-receipt-notes/goods-receipt-notes.component';
import { PurchaseBillComponent } from './purchase/purchase-bill/purchase-bill.component';
import { PurchaseCreditNoteComponent } from './purchase/purchase-credit-note/purchase-credit-note.component';
import { PurchaseDebitNoteComponent } from './purchase/purchase-debit-note/purchase-debit-note.component';
import { PurchaseReturnComponent } from './purchase/purchase-return/purchase-return.component';
import { PaymentDunesComponent } from './purchase/payment-dunes/payment-dunes.component';
import { OnlinePaymentComponent } from './purchase/online-payment/online-payment.component';
import { ItemMasterComponent } from './inventory/item-master/item-master.component';
import { StockAdjustmentComponent } from './inventory/stock-adjustment/stock-adjustment.component';
import { MaterialIssueComponent } from './inventory/material-issue/material-issue.component';
import { MaterialReceiptComponent } from './inventory/material-receipt/material-receipt.component';
import { InterBranchIssueComponent } from './inventory/inter-branch-issue/inter-branch-issue.component';
import { InterBranchReceiptComponent } from './inventory/inter-branch-receipt/inter-branch-receipt.component';
import { JobWorkOutwordComponent } from './inventory/job-work-outword/job-work-outword.component';
import { JobWorkInwardComponent } from './inventory/job-work-inward/job-work-inward.component';
import { InterBranchIssueRequestComponent } from './inventory/inter-branch-issue-request/inter-branch-issue-request.component';
import { BillPaymentComponent } from './purchase/bill-payment/bill-payment.component';
import { JobWorkOutwardRateComponent } from './inventory/job-work-outward-rate/job-work-outward-rate.component';
import { MaterialIssuedForJobWorkComponent } from './inventory/material-issued-for-job-work/material-issued-for-job-work.component';
import { MaterialReceivedAfterJobWorkComponent } from './inventory/material-received-after-job-work/material-received-after-job-work.component';
import { JobWorkOutworkInvoiceComponent } from './inventory/job-work-outwork-invoice/job-work-outwork-invoice.component';
import { LoginComponent } from './login/login.component';
import { AddAddressComponent } from './purchase/add-address/add-address.component';
import { AddressDetailsComponent } from './purchase/address-details/address-details.component';
import { PurchaseReportsComponent } from './purchase/purchase-reports/purchase-reports.component';
import { PurchaseReportComponent } from './inventory/purchase-report/purchase-report.component';
import { SalesReportComponent } from './inventory/sales-report/sales-report.component';


const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'uploadDocuments', component: UploadDocumentsComponent },
  { path: 'uploadDocuments/:userId/:role', component: UploadDocumentsComponent },
  { path: 'purchase/address', component: AddressDetailsComponent },
  { path: 'purchase/vendor', component: VendorComponent },
  { path: 'purchase/priceList', component: PriceListComponent },
  { path: 'purchase/purchaseOrder', component: PurchaseOrderComponent },
  { path: 'purchase/goodsReceiptNote', component: GoodsReceiptNotesComponent },
  { path: 'purchase/purchaseBill', component: PurchaseBillComponent },
  { path: 'purchase/purchaseCreditNote', component: PurchaseCreditNoteComponent },
  { path: 'purchase/purchaseDeditNote', component: PurchaseDebitNoteComponent },
  { path: 'purchase/purchaseReturn', component: PurchaseReturnComponent },
  { path: 'purchase/billPayment', component: BillPaymentComponent },
  { path: 'purchase/paymentDunes', component: PaymentDunesComponent },
  { path: 'purchase/onlinePayment', component: OnlinePaymentComponent },
  { path: 'purchase/purchaseReports', component: PurchaseReportsComponent },
  { path: 'inventory/itemMaster', component: ItemMasterComponent },
  { path: 'inventory/stockAdjustment', component: StockAdjustmentComponent },
  { path: 'inventory/purchaseReports', component: PurchaseReportComponent },
  { path: 'inventory/salesReports', component: SalesReportComponent },
  { path: 'inventory/materialIssue', component: MaterialIssueComponent },
  { path: 'inventory/materialReceipt', component: MaterialReceiptComponent },
  { path: 'inventory/interBranchIssueRequest', component: InterBranchIssueRequestComponent },
  { path: 'inventory/interBranchIssue', component: InterBranchIssueComponent },
  { path: 'inventory/interBranchReceipt', component: InterBranchReceiptComponent },
  { path: 'inventory/jobWorkOutWord', component: JobWorkOutwordComponent },
  { path: 'inventory/jobWorkInward', component: JobWorkInwardComponent },
  { path: 'inventory/jobWorkOutwardRate', component: JobWorkOutwardRateComponent },
  { path: 'inventory/materialIssueedForJobWork', component: MaterialIssuedForJobWorkComponent },
  { path: 'inventory/materialReceivedAfterJobWork', component: MaterialReceivedAfterJobWorkComponent },
  { path: 'inventory/jobWorkOutwardInvoice', component: JobWorkOutworkInvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
