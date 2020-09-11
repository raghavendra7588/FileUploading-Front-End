import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentItemMasterComponent } from '../dialog-content-item-master/dialog-content-item-master.component';
import { EmitterService } from 'src/shared/emitter.service';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
  displayedColumns: string[] = ['ProductName', 'GstClassification', 'ActiveStatus', 'FinalPurchasePrice', 'FinalSellingPrice', 'ItemType', 'MinimumLevel', 'action'];
  dataSource: any;
  itemMasterData: any = [];
  sellerId: number;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    public emitterService: EmitterService,
    public inventoryService: InventoryService) {

    this.emitterService.isItemCreated.subscribe(value => {
      if (value) {
        this.getItemMasterData();
      }
    });
  }

  ngOnInit() {
    // this.dataSource.sort = this.sort;
    this.sellerId = Number(sessionStorage.getItem('sellerId'));
    this.getItemMasterData();
  }


  openDialog() {
    this.dialog.open(DialogContentItemMasterComponent, {
      height: '600px',
      width: '800px',
    });
  }


  getItemMasterData() {
    this.inventoryService.getItemMaster(this.sellerId).subscribe(data => {
      this.itemMasterData = data;
      this.dataSource = this.itemMasterData;
    });
  }

  editItem(item) {
    this.dialog.open(DialogContentItemMasterComponent, {
      height: '600px',
      width: '800px',
      data: item
    });
  }
}
