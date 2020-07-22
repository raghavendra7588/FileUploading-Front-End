import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-content-vendor',
  templateUrl: './dialog-content-vendor.component.html',
  styleUrls: ['./dialog-content-vendor.component.css']
})
export class DialogContentVendorComponent implements OnInit {
  
  panelOpenState = false;
  documents:any;
  labelPosition: 'before' = 'before';

  constructor() { }

  ngOnInit(): void {
    this.documents = [
      { id: 0, type: 'Pan Card' },
      { id: 1, type: 'Aadhar Card' },
      { id: 2, type: 'Shop Act' },
      { id: 3, type: 'Cancel Cheque' },
      { id: 4, type: 'Individual Photo Copy' },
      { id: 5, type: 'Shop Photo' },
      { id: 6, type: 'Vendor Photo with Shop' }
    ];
  }

}
