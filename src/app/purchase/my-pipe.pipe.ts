import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseOrder } from './purchase.model';
import { PurchaseService } from './purchase.service';


@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {
  // priceListArray: any = [];
  // constructor(public purchaseService: PurchaseService) {
  //   // this.priceListArray = this.purchaseService.getPriceListData();
  //   // console.log('Inside PIPE', this.priceListArray);

  //   // this.priceListArray = this.purchaseService.priceListData();
  //   // console.log('from pipe ', this.priceListArray);

  // }

  transform(Id: any): any {
    console.log('00000000', Id);
    // if (this.priceListArray === undefined || this.priceListArray.length == 0) {
    //   // if (this.priceListArray === []) {
    //   // console.log('this are element ', element.ProductId, element.SellerId, element.ProductVarientId);
    //   // console.log('inside if block');
    //   return 0;
    // }
    // else {
    //   // console.log('inside else block');
    //   // console.log(element.ProductId, element.ProductId, element.ProductVarientId);
    //   // if (this.priceListArray.ProductId === element.ProductId && this.priceListArray.SellerId === element.ProductId && this.priceListArray.ProductVarientId === element.ProductVarientId) {
    //   //   return this.priceListArray;
    //   // }
    //   // else {
    //   //   return 100000;
    //   // }
    // }

  }

}
