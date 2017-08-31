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
  selector: 'app-members-member',
  templateUrl: './members.component.html',
  
})
export class MembersMemberComponent implements OnInit {
  miembros:any[] = [];
  membersEnable:any[] = [];

  constructor(
    private usuarioService:UsuarioService,
    private miembroService:MiembroService,
  ) { }

  ngOnInit() {
    this.initializeMiembros();
  }

  //CARGAR MIEMBROS
  public initializeMiembros() {
    this.membersEnable.splice(0);
    this.usuarioService.getUsuarios().subscribe(data => {
      this.miembros = data;
      for(let x of this.miembros) {
        if(x.TipoUsuarioID === 3 && x.Activo === 1) {
          this.membersEnable.push(x);
        }
      }
    });
  }
}