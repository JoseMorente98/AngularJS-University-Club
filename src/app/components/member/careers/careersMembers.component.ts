import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DetalleCarreraService } from '../../../services/detalleCarrera.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'app-careers-members',
    templateUrl: 'careersMembers.component.html',
  })
export class CareersMembersComponent implements OnInit {
    members:any[] = [];
    uri:string;

    //CONSTRUCTOR
    constructor(
        private detalleCarreraService:DetalleCarreraService,
        private router:Router,
        private activatedRoute:ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.uri = params["carreraID"];
        });        
    }

    ngOnInit() {
        this.initializePagos();
    }

    //CARGAR MIEMBROS
    public initializePagos() {
        this.detalleCarreraService.getCarrerasUsuario(this.uri).subscribe(data => {
            this.members = data;    
            console.log(data);    
        });
    }
}