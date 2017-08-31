import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'financier-root',
  templateUrl: './financier.component.html'
})
export class FinancierComponent implements OnInit {
  title = 'Financiero';
  constructor(){
  }

  ngOnInit() {}
}
