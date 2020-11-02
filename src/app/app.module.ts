import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//modules 
import { PurchaseModule } from './purchase/purchase.module';
import { InventoryModule } from './inventory/inventory.module';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { ReportsModule } from './reports/reports.module';


import { DashboardComponent } from './dashboard/dashboard.component';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

//services
import { EmitterService } from '../shared/emitter.service';


//angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { ToastrModule } from 'ngx-toastr';
import { PurchaseService } from './purchase/purchase.service';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PurchaseModule,
    InventoryModule,
    ReportsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatTableModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    NgMultiSelectDropDownModule.forRoot(),
    BarecodeScannerLivestreamModule,
    MatBadgeModule,
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
  providers: [EmitterService, LoginService, PurchaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
