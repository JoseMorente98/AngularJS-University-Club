import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';
//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-financiers',
  templateUrl: './financiers.component.html',
  
})
export class FinanciersComponent implements OnInit {
  financieros:any[] = [];
  financiers:any[] = [];
  formFinancier:FormGroup;

  formUpdateFinancier:FormGroup;
  uri:string;
  usuario:any = {
    UsuarioID: 0,
    Nombre: '',
    Apellido: '',
    Correo: '',
    Contrasena: ''
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
    private usuarioService:UsuarioService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.formFinancier = new FormGroup({
        'Nombre': new FormControl('', Validators.required),
        'Apellido': new FormControl('', Validators.required),
        'FechaNacimiento': new FormControl('2000-01-01', Validators.required),
        'Correo': new FormControl('', Validators.required),
        'Contrasena': new FormControl('', Validators.required),
        'TipoUsuarioID': new FormControl(2, Validators.required)
      });
      this.formUpdateFinancier = new FormGroup({
        'Nombre': new FormControl('', Validators.required),
        'Apellido': new FormControl('', Validators.required),
        'FechaNacimiento': new FormControl('2000-01-01', Validators.required),
        'Correo': new FormControl('', Validators.required),
        'Contrasena': new FormControl('', Validators.required),
        'TipoUsuarioID': new FormControl(2, Validators.required),
        'UsuarioID': new FormControl('', Validators.required)
      });
    this.initializeFinanciers();
  }

  //CARGAR FINANCIEROS
  public initializeFinanciers() {
    this.financiers.splice(0);
    this.usuarioService.getUsuarios().subscribe(data => {
      this.financieros = data;
      for(let x of this.financieros) {
        if(x.TipoUsuarioID === 2) {
          this.financiers.push(x);
        }
      }
    });
  }

  //AGREGAR FINANCIERO
  public addAdministrador() {
    console.log(this.formFinancier.value);
    this.usuarioService.addUsuario(this.formFinancier.value)
     .subscribe(res => {
       if(res.estado) {
         console.log(res.estado);
         console.log(res.mensaje);
         this.notificacion.mensaje = res.mensaje;
         this.notificacion.estado = res.estado;
         setTimeout(() => {
           this.initializeFinanciers();
           $('#modalAgregarFinanciero').modal('hide');
           this.notificacion.mensaje = '';
           this.notificacion.estado = false;
         }, 2500);
       } else {
         this.notificacionError.mensaje = res.mensaje;
         this.notificacionError.estado = res.estado;
       }
     });
  }

  //ELIMINAR FINANCIEROS
  public deleteFinancier(usuarioID:any){
    this.usuarioService.deleteUsuario(usuarioID)
    .subscribe(res => {
      if(res.estado) {
        this.initializeFinanciers();
      }
    });
  }

  //CARGAR ROUTE
   public loadFinancier(usuarioID:any) {
    this.usuarioService.getUsuario(usuarioID)
    .subscribe(res => this.usuario = res);
  }

  //ACTUALIZAR FINANCIEROS
  public updateFinancier() {
    this.usuarioService.updateUsuario(this.formUpdateFinancier.value)
    .subscribe(res => {
        if(res.estado) {
          console.log(res.estado);
          console.log(res.mensaje);
          this.notificacion.mensaje = res.mensaje;
          this.notificacion.estado = res.estado;
          setTimeout(() => {
            this.initializeFinanciers();
            $('#modalActualizarFinanciero').modal('hide');
            this.notificacion.mensaje = '';
            this.notificacion.estado = false;
          }, 2500);
        } else {
            this.notificacionError.mensaje = res.mensaje;
            this.notificacionError.estado = res.estado;
        }
    });
  }

  
}