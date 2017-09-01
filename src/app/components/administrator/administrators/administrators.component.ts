import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styles: []
})
export class AdministratorsComponent implements OnInit {
  administradores:any[] = [];
  administrators:any[] = [];

  formAdmin:FormGroup;
  formUpdateAdmin:FormGroup;

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
    this.formAdmin = new FormGroup({
      'Nombre': new FormControl('', Validators.required),
      'Apellido': new FormControl('', Validators.required),
      'FechaNacimiento': new FormControl('2000-01-01', Validators.required),
      'Correo': new FormControl('', Validators.required),
      'Contrasena': new FormControl('', Validators.required),
      'TipoUsuarioID': new FormControl(1, Validators.required)
    });
    this.formUpdateAdmin = new FormGroup({
      'Nombre': new FormControl('', Validators.required),
      'Apellido': new FormControl('', Validators.required),
      'FechaNacimiento': new FormControl('2000-01-01', Validators.required),
      'Correo': new FormControl('', Validators.required),
      'Contrasena': new FormControl('', Validators.required),
      'TipoUsuarioID': new FormControl(1, Validators.required),
      'UsuarioID': new FormControl('', Validators.required)
    });
    this.initializeAdministradores();
  }

  //CARGAR ADMINISTRADORES
  public initializeAdministradores() {
    this.administrators.splice(0);
    this.usuarioService.getUsuarios().subscribe(data => {
      this.administradores = data;
      for(let x of this.administradores) {
        if(x.TipoUsuarioID === 1) {
          this.administrators.push(x);
        }
      }
    });
  }

  //AGREGAR ADMINISTRADOR
  public AddAdministrador() {
    console.log(this.formAdmin.value);
    this.usuarioService.addUsuario(this.formAdmin.value)
     .subscribe(res => {
       if(res.estado) {
         console.log(res.estado);
         console.log(res.mensaje);
         this.notificacion.mensaje = res.mensaje;
         this.notificacion.estado = res.estado;
         setTimeout(() => {
           this.initializeAdministradores();
           $('#modalAgregarAdministrador').modal('hide');
           this.notificacion.mensaje = '';
           this.notificacion.estado = false;
         }, 2500);
       } else {
         this.notificacionError.mensaje = res.mensaje;
         this.notificacionError.estado = res.estado;
       }
     });
  }

  //ELIMINAR ADMINISTRADORES
  public deleteAdministrador(usuarioID:any){
    this.usuarioService.deleteUsuario(usuarioID)
    .subscribe(res => {
      if(res.estado) {
        this.initializeAdministradores();
      }
    });
  }

  //CARGAR ROUTE
   public loadAdministrador(usuarioID:any) {
    this.usuarioService.getUsuario(usuarioID)
    .subscribe(res => this.usuario = res);
  }

  //ACTUALIZAR ADMINISTRADORES
  public UpdateAdmin() {
    this.usuarioService.updateUsuario(this.formUpdateAdmin.value)
    .subscribe(res => {
        if(res.estado) {
          console.log(res.estado);
          console.log(res.mensaje);
          this.notificacion.mensaje = res.mensaje;
          this.notificacion.estado = res.estado;
          setTimeout(() => {
            this.initializeAdministradores();
            $('#modalActualizarAdministrador').modal('hide');
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