import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar-member',
  templateUrl: './navbar.component.html',
})
export class NavbarMemberComponent implements OnInit {
  constructor() {  }

  ngOnInit() {}

  public logOut() {
    localStorage.clear();
  }
}