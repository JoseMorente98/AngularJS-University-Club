import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CorreoService {
  private uriCorreo:string;
  private headers:Headers;

  //CONSTRUCTOR
  constructor(
    private http:Http,
    private router: Router
  ) {
    this.uriCorreo = "http://localhost:3000/api/correos";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
  }

  //OBTENER CORREOS
  public getCorreos() {
    return this.http.get(this.uriCorreo, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  //OBTENER CORREO
  public getCorreo(correoID:any) {
    let uri = `${this.uriCorreo}/${correoID}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  //NUEVO CORREO
  public addCorreo(correo:any) {
    let data = JSON.stringify(correo);
    let uri = `${this.uriCorreo}Send`;
    return this.http.post(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ELIMINAR CORREO
  public deleteCorreo(correoID:number) {
    let uri = `${this.uriCorreo}/${correoID}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}