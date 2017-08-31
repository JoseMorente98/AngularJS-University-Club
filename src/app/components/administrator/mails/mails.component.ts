import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { CorreoService } from '../../../services/correo.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styles: []
})
export class MailComponent implements OnInit {
  mails:any[] = [];
  formCorreo:FormGroup;
  uri:string;
  notificacion:any = {
    estado: false,
    mensaje: ""
  }
  notificacionError:any = {
    estado: false,
    mensaje: ""
  }

  constructor(
    private correoService:CorreoService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.formCorreo = new FormGroup({
      'to': new FormControl('', Validators.required),
      'subject': new FormControl('', Validators.required),
      'text': new FormControl('', Validators.required)
    });
    this.initializeMails();
  }

  //CARGAR CORREOS
  public initializeMails() {
    this.correoService.getCorreos().subscribe(data => {
      console.log(data);
      this.mails = data;
    });
  }

  //ENVIAR CORREO
  public sendMail() {
    this.correoService.addCorreo(this.formCorreo.value)
     .subscribe(res => {
       if(res.estado) {
         console.log(res.estado);
         console.log(res.mensaje);
         this.notificacion.mensaje = res.mensaje;
         this.notificacion.estado = res.estado;
         setTimeout(() => {
           this.initializeMails();
           $('#modalEnviarCorreo').modal('hide');
           this.notificacion.mensaje = '';
           this.notificacion.estado = false;
         }, 2500);
       } else {
         this.notificacionError.mensaje = res.mensaje;
         this.notificacionError.estado = res.estado;
       }
     });
  }

  //ELIMINAR CORREO
  public deleteMail(correoID:any){
    this.correoService.deleteCorreo(correoID)
    .subscribe(res => {
      if(res.estado) {
        this.initializeMails();
      }
    });
  }
  
}