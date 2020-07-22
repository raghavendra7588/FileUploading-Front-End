import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentPriceListComponent } from '../dialog-content-price-list/dialog-content-price-list.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  registerForm: FormGroup;
  submitted = false;
  mobileNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
  name_regex = /^[a-zA-Z]+$/;
  email_regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  countryTemplateForm = null;
  createdBy: any;


  constructor(public dialog: MatDialog, public formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.pattern(this.mobileNumberRegex)]],
      firstName: ['', [Validators.required, Validators.pattern(this.name_regex)]]
    });
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  openDialog() {
    this.dialog.open(DialogContentPriceListComponent, {
      height: '600px',
      width: '800px',
    });
  }

  onSubmit() {
    console.log("clicked");
    this.registerForm.reset();
  }
}
