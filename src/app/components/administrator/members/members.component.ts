import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

//COMPONENTES
import { UsuarioService } from '../../../services/usuario.service';
import { MiembroService } from '../../../services/miembro.service';
import { CarreraService } from '../../../services/carrera.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  
})
export class MembersComponent implements OnInit {
  miembros:any[] = [];
  membersDisable:any[] = [];
  membersEnable:any[] = [];
  careers:any[] = [];
  formMember:FormGroup;

  formUpdateMember:FormGroup;
  uri:string;
  usuario:any = {
    UsuarioID: 0,
    Nombre: '',
    Apellido: '',
    FechaNacimiento: '',
    Nit: '',
    Profesion: '',
    GradoAcademico: '',
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
    private miembroService:MiembroService,
    private carreraService:CarreraService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.formMember = new FormGroup({
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
      this.formUpdateMember = new FormGroup({
        'Nombre': new FormControl('', Validators.required),
        'Apellido': new FormControl('', Validators.required),
        'FechaNacimiento': new FormControl('', Validators.required),
        'Nit': new FormControl('', Validators.required),
        'Profesion': new FormControl('', Validators.required),
        'GradoAcademico': new FormControl('', Validators.required),
        'Correo': new FormControl('', Validators.required),
        'Contrasena': new FormControl('', Validators.required),
        'UsuarioID': new FormControl('', Validators.required)
      });
    this.initializeMiembros();
    this.initializeCarreras();
  }

  //CARGAR MIEMBROS
  public initializeMiembros() {
    this.membersDisable.splice(0);
    this.membersEnable.splice(0);
    this.usuarioService.getUsuarios().subscribe(data => {
      this.miembros = data;
      for(let x of this.miembros) {
        if(x.TipoUsuarioID === 3 && x.Activo === 0) {
          this.membersDisable.push(x);
        }
      }
      for(let x of this.miembros) {
        if(x.TipoUsuarioID === 3 && x.Activo === 1) {
          this.membersEnable.push(x);
        }
      }
    });
  }

  public initializeCarreras() {
    this.carreraService.getCarreras().subscribe(data => {
      this.careers = data;
    });
  }

  //AGREGAR MIEMBRO
  public addMiembro() {
    console.log(this.formMember.value);
    this.miembroService.addMiembro(this.formMember.value)
     .subscribe(res => {
       if(res.estado) {
         console.log(res.estado);
         console.log(res.mensaje);
         this.notificacion.mensaje = res.mensaje;
         this.notificacion.estado = res.estado;
         setTimeout(() => {
           this.initializeMiembros();
           $('#modalAgregarMiembro').modal('hide');
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
  public deleteMiembro(usuarioID:any){
    this.usuarioService.deleteUsuario(usuarioID)
    .subscribe(res => {
      if(res.estado) {
        this.initializeMiembros();
      }
    });
  }

  //CARGAR ROUTE
   public loadMiembro(usuarioID:any) {
    this.usuarioService.getUsuario(usuarioID)
    .subscribe(res => this.usuario = res);
  }

  //ACTUALIZAR FINANCIEROS
  public updateMiembro() {
    console.log(this.formUpdateMember.value);
    this.miembroService.updateMiembro(this.formUpdateMember.value)
    .subscribe(res => {
      console.log(res);
        if(res.estado) {
          this.notificacion.mensaje = res.mensaje;
          this.notificacion.estado = res.estado;
          setTimeout(() => {
            this.initializeMiembros();
            $('#modalActualizarMiembro').modal('hide');
            this.notificacion.mensaje = '';
            this.notificacion.estado = false;
          }, 2500);
        } else {
            this.notificacionError.mensaje = res.mensaje;
            this.notificacionError.estado = res.estado;
        }
    });
  }

  //ACTUALIZAR ESTADO
  public updateActive(usuarioID:any){
    this.usuarioService.updateActive(usuarioID)
    .subscribe(res => {
      console.log(res);
      if(res.estado) {
        this.initializeMiembros();
      }
    });
  }

  
}