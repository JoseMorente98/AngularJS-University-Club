import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-error',
  templateUrl: './navbar.component.html',
})
export class NavbarErroComponent implements OnInit {
  constructor() {  }

  ngOnInit() {}

  public logOut() {
    localStorage.clear();
  }
}