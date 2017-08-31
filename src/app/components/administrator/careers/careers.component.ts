import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { CarreraService } from '../../../services/carrera.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styles: []
})
export class CareersComponent implements OnInit {
  careers:any[] = [];
  formularioCarrera:FormGroup;
  formularioUpdateCarrera:FormGroup;
  uri:string;
  carrera:any = {
    CarreraID: 0,
    Nombre: ''
  }
  notificacion:any = {
    estado: false,
    mensaje: ""
  }
  notificacionError:any = {
    estado: false,
    mensaje: ""
  }

  constructor(
    private carreraService:CarreraService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.formularioCarrera = new FormGroup({
      'Nombre': new FormControl('', Validators.required)
    });
    this.formularioUpdateCarrera = new FormGroup({
      'Nombre': new FormControl('', Validators.required),
      'CarreraID': new FormControl('', Validators.required)
    });
    this.initializeCareers();
  }

  //CARGAR CARRERAS
  public initializeCareers() {
    this.carreraService.getCarreras().subscribe(data => {
      console.log(data);
      this.careers = data;
    });
  }

  //CARGA EL ROUTER
  public LoadCarrera(carreraID:any) {
    this.carreraService.getCarrera(carreraID)
    .subscribe(res => this.carrera = res);
  }

  //AGREGAR CARRERA
  public AddCarrera() {
    this.carreraService.addCarrera(this.formularioCarrera.value)
     .subscribe(res => {
       if(res.estado) {
         console.log(res.estado);
         console.log(res.mensaje);
         this.notificacion.mensaje = res.mensaje;
         this.notificacion.estado = res.estado;
         setTimeout(() => {
           this.initializeCareers();
           $('#modalAgregarCarrera').modal('hide');
           this.notificacion.mensaje = '';
           this.notificacion.estado = false;
         }, 2500);
       } else {
         this.notificacionError.mensaje = res.mensaje;
         this.notificacionError.estado = res.estado;
       }
     });
  }

  //ACTUALIZAR CARRERA
  public UpdateCarrera() {
    this.carreraService.updateCarrera(this.formularioUpdateCarrera.value)
    .subscribe(res => {
        if(res.estado) {
          console.log(res.estado);
          console.log(res.mensaje);
          this.notificacion.mensaje = res.mensaje;
          this.notificacion.estado = res.estado;
          setTimeout(() => {
            this.initializeCareers();
            $('#modalActualizarCarrera').modal('hide');
          }, 2500);
        } else {
            this.notificacionError.mensaje = res.mensaje;
            this.notificacionError.estado = res.estado;
        }
    });
  }

  //ELIMINAR CARRERA
  public DeleteCarrera(carreraID:any){
    this.carreraService.deleteCarrera(carreraID)
    .subscribe(res => {
      if(res.estado) {
        this.initializeCareers();
      }
    });
  }
  
}