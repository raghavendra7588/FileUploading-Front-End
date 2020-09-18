import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxPrintModule } from 'ngx-print';
import { MatPaginatorModule } from '@angular/material/paginator';



import { MinimumRatePurchaseOrderComponent } from './minimum-rate-purchase-order/minimum-rate-purchase-order.component';
import { DialogMinimumRatePurchaseOrderComponent } from './dialog-minimum-rate-purchase-order/dialog-minimum-rate-purchase-order.component';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProductVendorWisePurchaseReportComponent } from './product-vendor-wise-purchase-report/product-vendor-wise-purchase-report.component';
import { DialogProductVendorWisePurchaseReportComponent } from './dialog-product-vendor-wise-purchase-report/dialog-product-vendor-wise-purchase-report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { DialogSalesReportComponent } from './dialog-sales-report/dialog-sales-report.component';


@NgModule({
  declarations: [MinimumRatePurchaseOrderComponent, DialogMinimumRatePurchaseOrderComponent, ProductVendorWisePurchaseReportComponent, DialogProductVendorWisePurchaseReportComponent, SalesReportComponent, DialogSalesReportComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
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
    ReactiveFormsModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule.forRoot(),
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
  entryComponents: [DialogMinimumRatePurchaseOrderComponent, DialogProductVendorWisePurchaseReportComponent],
  exports: [MinimumRatePurchaseOrderComponent, DialogMinimumRatePurchaseOrderComponent]
})
export class ReportsModule { }
