import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-administrator',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor() {  }

  ngOnInit() {}

  public logOut() {
    localStorage.clear();
  }
}