import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MiembroService {
  private uriMiembro:string;
  private headers:Headers;

  //CONSTRUCTOR
  constructor(
    private http:Http,
    private router: Router
  ) {
    this.uriMiembro = "http://localhost:3000/api/miembros";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
  }

  //OBTENER MIEMBROS
  public getMiembros() {
    return this.http.get(this.uriMiembro, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  //AGREGAR MIEMBROS
  public addMiembro(miembro:any) {
    let data = JSON.stringify(miembro);
    return this.http.post(this.uriMiembro, data, { headers: this.headers })
    .map(res => res.json());
  }

  //EDITAR MIEMBROS
  public updateMiembro(miembro:any) {
    let uri = `${this.uriMiembro}/${miembro.UsuarioID}`;
    let data = JSON.stringify(miembro);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

}