import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

//COMPONENTES
import { UsuarioService } from '../../../services/usuario.service';
import { CarreraService } from '../../../services/carrera.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-members-financier',
  templateUrl: './member.component.html',
  
})
export class MembersFinancierComponent implements OnInit {
  miembros:any[] = [];
  members:any[] = [];

  constructor(
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit() {
    this.initializeMiembros();
  }

  //CARGAR MIEMBROS
  public initializeMiembros() {
    this.members.splice(0);
    this.usuarioService.getUsuarios().subscribe(data => {
      this.miembros = data;
      for(let x of this.miembros) {
        if(x.TipoUsuarioID === 3 && x.Activo === 1) {
          this.members.push(x);
        }
      }
    });
  }

}