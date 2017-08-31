import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

import { UsuarioService } from '../../../services/usuario.service';
import { MembresiaService } from '../../../services/membresia.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  
})
export class RecordsMorososComponent implements OnInit {
  usuarios:any[] = [];
  membresias:any[] = [];
  users:any[] = [];
  members:any[] = [];

  constructor(
    private usuarioService:UsuarioService,
    private membresiaService:MembresiaService
  ) { }

  ngOnInit() {
    this.initializeMorosos();
  }

  //CARGAR PAGOS
  public initializeMorosos() {
    this.members.splice(0);
    var d = new Date();
    var n = d.getMonth() + 1;
    var ye = d.getFullYear();
    this.membresiaService.getAllMembresias().subscribe(data => {
      this.membresias = data;
        for(let y of this.membresias) {
          if(y.Mes !== n.toString()) {
            console.log(y);
            this.members.push(y);
          }
        }  
    });
  }

}