import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

//COMPONENTES
import { DetalleCarreraService } from '../../../services/detalleCarrera.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-careers-member',
  templateUrl: './careers.component.html',
  
})
export class CareersMemberComponent implements OnInit {
  carreras:any[] = [];

  constructor(
    private detalleCarreraService:DetalleCarreraService
  ) { }

  ngOnInit() {
    this.initializeCarreras();
  }

  //CARGAR MIEMBROS
  public initializeCarreras() {
    this.detalleCarreraService.getDetalleCarreras().subscribe(data => {
      this.carreras = data;      
    });
  }
}