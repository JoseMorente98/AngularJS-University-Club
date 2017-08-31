import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { MiembroService } from './../../services/miembro.service';
import { CarreraService } from './../../services/carrera.service';
import { UsuarioService } from './../../services/usuario.service';
//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'home-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  title = 'Register University Club';
  //DECLARACION DE VARIABLES
  formRegistrar:FormGroup;
  careers:any[] = [];
  uri:string;
  autenticar:boolean = true;
  notificacion:any = {
    estado: false,
    mensaje: ""
  }
  notificacionError:any = {
    estado: false,
    mensaje: ""
  }
  aut:any = {
    Correo: '',
    Contrasena: ''
  }

  //CONSTRUCTOR
  constructor(
    private miembroService:MiembroService,
    private carreraService:CarreraService,
    private usuarioService:UsuarioService,
    private router:Router
  ) {  
  }

  //ON INIT
  ngOnInit() {
    this.formRegistrar = new FormGroup({
      'Nombre': new FormControl('', Validators.required),
      'Apellido': new FormControl('', Validators.required),
      'FechaNacimiento': new FormControl('', Validators.required),
      'Nit': new FormControl('', Validators.required),
      'Profesion': new FormControl('', Validators.required),
      'GradoAcademico': new FormControl('', Validators.required),
      'CarreraID': new FormControl('', Validators.required),
      'FechaGraduacion': new FormControl('', Validators.required),
      'Correo': new FormControl('', Validators.required),
      'Contrasena': new FormControl('', Validators.required)
    });
    this.initializeCarreras();
  }

  public initializeCarreras() {
    this.carreraService.getCarreras().subscribe(data => {
      this.careers = data;
    });
  }

  //AGREGAR MIEMBRO
  public addMiembro() {
    console.log(this.formRegistrar.value);
    this.aut.Correo = this.formRegistrar.value.Correo;
    this.aut.Contrasena = this.formRegistrar.value.Contrasena;
    console.log(this.aut);
    this.miembroService.addMiembro(this.formRegistrar.value)
     .subscribe(res => {
       if(res.estado) {
         console.log(res.estado);
         console.log(res.mensaje);
         this.notificacion.mensaje = res.mensaje;
         this.notificacion.estado = res.estado;
         setTimeout(() => {
           this.notificacion.mensaje = '';
           this.notificacion.estado = false;
           this.Auth(this.aut);
         }, 2500);
       }
     });
  }
  public Auth(usuario:any) {
  this.usuarioService.authentication(usuario)
    .subscribe(res => {
        console.log(res);
        let token = res.token;
        if(token) {
            console.log("Si existe el token");
            localStorage.setItem('token', token);
            if(res.TipoUsuarioID === 3 && res.Activo === 0) {
              if(res.estado) {
                  console.log(res.estado);
                  console.log(res.mensaje);
                  this.notificacion.mensaje = res.mensaje + " Miembro :D";
                  this.notificacion.estado = res.estado;
                  setTimeout(() => {
                    $('#modalLogin').modal('hide');
                      this.router.navigate(['/member-error/error']);
                  }, 5000);
              } else {
                  this.notificacionError.mensaje = res.mensaje;
                  this.notificacionError.estado = res.estado;
              }
          }
            
        } else {
            console.log("No existen token");
            this.notificacionError.mensaje = "Ingrese su usuario o contraseña correctamente.";
            this.notificacionError.estado = true;
            return false;
        }
    });
  }


}
