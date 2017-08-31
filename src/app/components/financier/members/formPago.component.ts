import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MembresiaService } from '../../../services/membresia.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
    selector: 'app-pago-form',
    templateUrl: 'formPago.component.html',
  })
export class FormMiembroComponent implements OnInit {
    pagos:any[] = [];
    uri:string;
    formPago:FormGroup;

    notificacion:any = {
        estado: false,
        mensaje: ""
    }
    notificacionError:any = {
        estado: false,
        mensaje: ""
    }
    pagosAll:any;

    //CONSTRUCTOR
    constructor(
        private membresiaService:MembresiaService,
        private router:Router,
        private activatedRoute:ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.uri = params["usuarioID"];
        });        
    }

    ngOnInit() {
        this.formPago = new FormGroup({
            'UsuarioID': new FormControl(this.uri, Validators.required),
            'Pago': new FormControl('', Validators.required),
            'Mora': new FormControl('', Validators.required),
            'MedioPago': new FormControl('', Validators.required),
            'Motivo': new FormControl('', Validators.required)
          });
        this.initializePagos();
    }

    //CARGAR MIEMBROS
    public initializePagos() {
        var d = new Date();
        var n = d.getMonth() + 1;
        this.membresiaService.getMembresia(this.uri).subscribe(data => {
            this.pagos = data;
            for(let x of this.pagos) {
                if(x.MesPago == n.toString()) {
                    this.pagosAll = "Al Día";
                } else {
                    this.pagosAll = "Atrasados";
                }
                break;
            }
        });
    }

    //AGREGAR PAGO
    public addPago() {
        this.membresiaService.addMembresia(this.formPago.value)
        .subscribe(res => {
        if(res.estado) {
            console.log(res.estado);
            console.log(res.mensaje);
            this.notificacion.mensaje = res.mensaje;
            this.notificacion.estado = res.estado;
            setTimeout(() => {
            this.initializePagos();
            $('#modalAgregarCobro').modal('hide');
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