import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BuyProductsService } from '../buy-products/buy-products.service';


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
import { MatBadgeModule } from '@angular/material/badge';

import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CategoryComponent } from './category/category.component';
import { BrandsComponent } from './brands/brands.component';
import { ProductInformationComponent } from './product-information/product-information.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { GoToCartComponent } from './go-to-cart/go-to-cart.component';

import { DialogAddAddressComponent } from './dialog-add-address/dialog-add-address.component';
import { AddressDetailDataComponent } from './address-detail-data/address-detail-data.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { DialogOrderNoComponent } from './dialog-order-no/dialog-order-no.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { DialogMyOrdersEditComponent } from './dialog-my-orders-edit/dialog-my-orders-edit.component';
import { DialogMyOrdersViewComponent } from './dialog-my-orders-view/dialog-my-orders-view.component';



@NgModule({
  declarations: [SubCategoriesComponent, CategoryComponent, BrandsComponent, ProductInformationComponent,
    BuyProductComponent, GoToCartComponent, DialogAddAddressComponent, AddressDetailDataComponent, PlaceOrderComponent,
    DialogOrderNoComponent,
    MyOrderComponent,
    DialogMyOrdersEditComponent,
    DialogMyOrdersViewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
    MatNativeDateModule,
    ToastrModule,
    NgxPrintModule,
    MatPaginatorModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [DialogAddAddressComponent, DialogOrderNoComponent, DialogMyOrdersEditComponent, DialogMyOrdersViewComponent],
  exports: [SubCategoriesComponent, CategoryComponent, BrandsComponent, ProductInformationComponent, BuyProductComponent,
    GoToCartComponent, AddressDetailDataComponent, MyOrderComponent],
  providers: [BuyProductsService]
})
export class BuyProductsModule { }
