import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DetalleCarreraService } from '../../../services/detalleCarrera.service';
import { CarreraService } from '../../../services/carrera.service';
//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'app-careers-members',
    templateUrl: 'careersMembers.component.html',
  })
export class CareersMembersAdminComponent implements OnInit {
    careers:any[] = [];
    carreras:any[] = [];
    uri:string;
    formCarrera:FormGroup;
    usuario = {
        NombreUsuario: '',
        Apellido: ''
    }
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
        private detalleCarreraService:DetalleCarreraService,
        private carreraService:CarreraService,
        private router:Router,
        private activatedRoute:ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.uri = params["usuarioID"];
        });        
    }

    ngOnInit() {
        this.formCarrera = new FormGroup({
            'UsuarioID': new FormControl(this.uri, Validators.required),
            'CarreraID': new FormControl('', Validators.required),
            'FechaGraduacion': new FormControl('', Validators.required)
        });
        this.initializeCarrerasMiembros();
        this.initializeCarreras();
    }

    //CARGAR MIEMBROS
    public initializeCarrerasMiembros() {
        this.detalleCarreraService.getCarreras(this.uri).subscribe(data => {
            this.careers = data; 
            for(let x of this.careers) {
                this.usuario.NombreUsuario = x.NombreUsuario;
                this.usuario.Apellido = x.Apellido;
                break;
            }           
        });
    }

    //CARGAR CARRERAS
    public initializeCarreras() {
        this.carreraService.getCarreras().subscribe(data => {
            this.carreras = data;  
        });
    }

    //AGREGAR CARRERAS AL USUARIO
    public asignarCarrera() {
        console.log(this.formCarrera.value);
        this.detalleCarreraService.addDetalleCarrera(this.formCarrera.value)
        .subscribe(res => {
        if(res.estado) {
            console.log(res.estado);
            console.log(res.mensaje);
            this.notificacion.mensaje = res.mensaje;
            this.notificacion.estado = res.estado;
            setTimeout(() => {
            this.initializeCarrerasMiembros();
            $('#modalAsignarCarrera').modal('hide');
            this.notificacion.mensaje = '';
            this.notificacion.estado = false;
            }, 2500);
        } else {
            this.notificacionError.mensaje = res.mensaje;
            this.notificacionError.estado = res.estado;
        }
        });
    }

    //ELIMINAR CARRERAS DEL USUARIO
    public deleteDetalleCarrera(detalleCarreraID:any){
        this.detalleCarreraService.deleteDetalleCarrera(detalleCarreraID)
        .subscribe(res => {
        if(res.estado) {
            this.initializeCarrerasMiembros();
        }
        });
    }

}