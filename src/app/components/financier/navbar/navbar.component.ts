import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-financier',
  templateUrl: './navbar.component.html',
})
export class NavbarFinancierComponent implements OnInit {
  constructor() {  }

  ngOnInit() {}

  public logOut() {
    localStorage.clear();
  }
}