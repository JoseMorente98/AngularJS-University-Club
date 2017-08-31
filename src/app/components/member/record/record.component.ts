import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

//COMPONENTES
import { MembresiaService } from '../../../services/membresia.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-record-member',
  templateUrl: './record.component.html',
  
})
export class RecordMemberComponent implements OnInit {
  membresias:any[] = [];
  memberships:any[] = [];
  membershipsOther:any[] = [];

  constructor(
    private MembresiaService:MembresiaService
  ) { }

  ngOnInit() {
    this.initializePagos();
  }

  //CARGAR HISTORIAL DE PAGOS
  public initializePagos() {
    this.memberships.splice(0);
    this.membershipsOther.splice(0);
    this.MembresiaService.getMembresias().subscribe(data => {
      this.membresias = data;
      for(let x of this.membresias) {
        if(x.Motivo === 'Mensualidad') {
          this.memberships.push(x);
        }
      }
      for(let x of this.membresias) {
        if(x.Motivo !== 'Mensualidad') {
          this.membershipsOther.push(x);
        }
      }
    });
  }
}