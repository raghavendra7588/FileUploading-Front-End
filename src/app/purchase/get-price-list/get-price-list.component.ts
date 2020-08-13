import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];



@Component({
  selector: 'app-get-price-list',
  templateUrl: './get-price-list.component.html',
  styleUrls: ['./get-price-list.component.css']
})
export class GetPriceListComponent implements OnInit, OnDestroy {

  priceListData: any = [];
  sellerId: any;
  masterBrandData: any = [];
  extractPriceListData: any = [];
  finalPriceList: any = [];

  dataSource: any;
  isDataLoaded: boolean = false;
  displayedColumns: string[] = ['productId', 'brandName', 'productName'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public purchaseService: PurchaseService) { this.isDataLoaded = false; }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();

    this.sellerId = localStorage.getItem('sellerId');
    // this.getPriceListData();
    // this.getBrandsMasterData();
    // this.purchaseService.getPriceListData();
  //  this.finalPriceList = this.purchaseService.getBrandsMasterData();
    // console.log('**************', this.finalPriceList);
  }

  // getPriceListData() {
  //   this.purchaseService.getAllPriceListData(this.sellerId).subscribe(data => {
  //     this.priceListData = data;
  //     console.log('received Price List Data', this.priceListData);
  //   });
  // }

  // getBrandsMasterData() {
  //   this.purchaseService.getEveryBrand().subscribe(data => {
  //     this.masterBrandData = data;
  //     this.extractPriceListData = this.extractPriceList(this.masterBrandData, this.priceListData);
  //     this.finalPriceList = this.mapObj(this.extractPriceListData, this.priceListData);
  //     console.log('APPEND THIS TO GRID', this.finalPriceList);
  //     // this.dataSource.data = this.finalPriceList;
  //     // this.isDataLoaded = true;
  //     // this.dataSource.paginator = this.paginator;
  //   });
  // }

  // extractPriceList(apiData, ownDbData) {
  //   let count = 0;
  //   let result = apiData.filter(o1 => ownDbData.some(o2 => o1.ProductID === o2.ProductId && o1.ProductVarientId === o2.ProductVarientId));
  //   console.log('you have :', count);
  //   return result;
  // }


  // mapObj(apiData, ownDbData) {
  //   for (let i = 0; i < apiData.length; i++) {
  //     apiData[i].ProductPrice = 0;
  //     for (let j = 0; j < ownDbData.length; j++) {
  //       if (apiData[i].ProductID === ownDbData[j].ProductId && apiData[i].ProductVarientId === ownDbData[j].ProductVarientId) {
  //         apiData[i].ProductPrice = ownDbData[j].BuyingPrice;
  //         apiData[i].Discount = ownDbData[j].Discount;
  //         apiData[i].FinalPrice = ownDbData[j].FinalPrice;
  //       }
  //     }
  //   }
  //   return apiData;
  // }

  ngOnDestroy() {
    this.isDataLoaded = false;
  }

}
