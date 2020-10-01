import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public router: Router) { }

  ngOnInit(): void {
  }

  Logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
