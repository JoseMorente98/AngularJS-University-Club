import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { UsuarioService } from './../../services/usuario.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'home-login',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title = 'Welcome University Club';
  //DECLARACION DE VARIABLES
  formLogin:FormGroup;
  autenticar:boolean = true;
  notificacion:any = {
    estado: false,
    mensaje: ""
  }
  notificacionError:any = {
    estado: false,
    mensaje: ""
  }

  //CONSTRUCTOR
  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ) {  }

  //ON INIT
  ngOnInit() {
    this.formLogin = new FormGroup({
      'Correo': new FormControl('', Validators.required),
      'Contrasena': new FormControl('', Validators.required)
    });
  }

  public logIn() {
    console.log(this.formLogin.value);
    
    this.usuarioService.authentication(this.formLogin.value)
    .subscribe(res => {
        console.log(res);
        let token = res.token;
        if(token) {
            console.log("Si existe el token");
            localStorage.setItem('token', token);
            if(res.TipoUsuarioID == 1) {
                if(res.estado) {
                    this.notificacion.mensaje = res.mensaje + " Administrador :D";
                    this.notificacion.estado = res.estado;
                    localStorage.setItem('Usuario', res.TipoUsuarioID);
                    setTimeout(() => {
                      $('#modalLogin').modal('hide');
                        this.router.navigate(['/administrator/administrators']);
                    }, 3000);
                } else {
                    this.notificacionError.mensaje = res.mensaje;
                    this.notificacionError.estado = res.estado;
                }
            } else if (res.TipoUsuarioID == 2) {
                if(res.estado) {
                    this.notificacion.mensaje = res.mensaje + " Financiero :D";
                    this.notificacion.estado = res.estado;
                    localStorage.setItem('Usuario', res.TipoUsuarioID);
                    setTimeout(() => {
                      $('#modalLogin').modal('hide');
                        this.router.navigate(['/financier']);
                    }, 5000);
                } else {
                    this.notificacionError.mensaje = res.mensaje;
                    this.notificacionError.estado = res.estado;
                }
            } else if (res.TipoUsuarioID === 3 && res.Activo === 0) {
              if(res.estado) {
                  this.notificacion.mensaje = res.mensaje + " Miembro :D";
                  this.notificacion.estado = res.estado;
                  localStorage.setItem('Usuario', res.TipoUsuarioID);
                  setTimeout(() => {
                      $('#modalLogin').modal('hide');
                      this.router.navigateByUrl('/member-error');
                  }, 5000);
              } else {
                  this.notificacionError.mensaje = res.mensaje;
                  this.notificacionError.estado = res.estado;
              }
          } else if (res.TipoUsuarioID === 3 && res.Activo === 1) {
              if(res.estado) {
                  this.notificacion.mensaje = res.mensaje + " Miembro :D";
                  this.notificacion.estado = res.estado;
                  localStorage.setItem('Usuario', res.TipoUsuarioID);
                  setTimeout(() => {
                    $('#modalLogin').modal('hide');
                      this.router.navigate(['/member/members']);
                  }, 5000);
              }
              else {
                  this.notificacionError.mensaje = res.mensaje;
                  this.notificacionError.estado = res.estado;
              }
       
        } else {
            console.log("No existen token");
            this.notificacionError.mensaje = "Ingrese su usuario o contraseña correctamente.";
            this.notificacionError.estado = true;
            setTimeout(() => {
                this.notificacionError.mensaje = '';
                this.notificacionError.estado = '';
              }, 2000);
            return false;
        }
    } else {
        console.log("No existen token");
        this.notificacionError.mensaje = "Ingrese su usuario o contraseña correctamente.";
        this.notificacionError.estado = true;
        setTimeout(() => {
            this.notificacionError.mensaje = '';
            this.notificacionError.estado = '';
          }, 2000);
        return false;
    }
    });
  }
}
