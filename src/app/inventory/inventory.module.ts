import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ItemMasterComponent } from './item-master/item-master.component';
import { StockAdjustmentComponent } from './stock-adjustment/stock-adjustment.component';
import { MaterialIssueComponent } from './material-issue/material-issue.component';
import { MaterialReceiptComponent } from './material-receipt/material-receipt.component';
import { InterBranchIssueRequestComponent } from './inter-branch-issue-request/inter-branch-issue-request.component';
import { InterBranchIssueComponent } from './inter-branch-issue/inter-branch-issue.component';
import { InterBranchReceiptComponent } from './inter-branch-receipt/inter-branch-receipt.component';
import { JobWorkOutwordComponent } from './job-work-outword/job-work-outword.component';
import { JobWorkInwardComponent } from './job-work-inward/job-work-inward.component';
import { JobWorkInwardRateComponent } from './job-work-inward-rate/job-work-inward-rate.component';
import { MaterialIssuedForJobWorkComponent } from './material-issued-for-job-work/material-issued-for-job-work.component';
import { JobWorkOutworkInvoiceComponent } from './job-work-outwork-invoice/job-work-outwork-invoice.component';
import { JobWorkOutwardRateComponent } from './job-work-outward-rate/job-work-outward-rate.component';
import { MaterialReceivedAfterJobWorkComponent } from './material-received-after-job-work/material-received-after-job-work.component';
import { DialogContentItemMasterComponent } from './dialog-content-item-master/dialog-content-item-master.component';
import { PurchaseReportComponent } from './purchase-report/purchase-report.component';


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
import { SalesReportComponent } from './sales-report/sales-report.component';
import { DialogPrintPurchaseReportComponent } from './dialog-print-purchase-report/dialog-print-purchase-report.component';

import { InventoryService } from './inventory.service';
import { ToastrModule } from 'ngx-toastr';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ItemMasterComponent, StockAdjustmentComponent, MaterialIssueComponent, MaterialReceiptComponent, InterBranchIssueRequestComponent, InterBranchIssueComponent, InterBranchReceiptComponent, JobWorkOutwordComponent, JobWorkInwardComponent, JobWorkInwardRateComponent, MaterialIssuedForJobWorkComponent, JobWorkOutworkInvoiceComponent, JobWorkOutwardRateComponent, MaterialReceivedAfterJobWorkComponent, DialogContentItemMasterComponent, PurchaseReportComponent, SalesReportComponent, DialogPrintPurchaseReportComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    MatCheckboxModule
  ],
  providers: [InventoryService],
  exports: [ItemMasterComponent, StockAdjustmentComponent, MaterialIssueComponent, MaterialReceiptComponent, InterBranchIssueRequestComponent, InterBranchIssueComponent, InterBranchReceiptComponent, JobWorkOutwordComponent, JobWorkInwardComponent]
})
export class InventoryModule { }
