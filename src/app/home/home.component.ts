import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  joinWithUs() {
    this.router.navigate(['/uploadDocuments'], { queryParams: { userId: 'managerId', role: 'vendor' } });
  }
}
