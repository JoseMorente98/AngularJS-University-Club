import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DetalleCarreraService {
  private uriDetalleCarrera:string;
  private headers:Headers;

  //CONSTRUCTOR
  constructor(
    private http:Http,
    private router: Router
  ) {
    this.uriDetalleCarrera = "http://localhost:3000/api/detalleCarreras";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
  }

  //OBTENER DETALLE CARRERAS
  public getDetalleCarreras() {
    return this.http.get(this.uriDetalleCarrera, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  //OBTENER DETALLE CARRERA
  public getDetalleCarrera(detalleCarreraID:any) {
    let uri = `${this.uriDetalleCarrera}/usuario/${detalleCarreraID}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  //OBTENER DETALLE CARRERA
  public getCarreras(detalleCarreraID:any) {
    let uri = `${this.uriDetalleCarrera}/usuario/${detalleCarreraID}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  //NUEVA DETALLE CARRERA
  public addDetalleCarrera(detalleCarrera:any) {
    let data = JSON.stringify(detalleCarrera);
    return this.http.post(this.uriDetalleCarrera, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ACTUALIZAR DETALLE CARRERA
  public updateDetalleCarrera(detalleCarrera:any) {
    let uri = `${this.uriDetalleCarrera}/${detalleCarrera.DetalleCarreraID}`;
    let data = JSON.stringify(detalleCarrera);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ELIMINAR DETALLE CARRERA
  public deleteDetalleCarrera(detalleCarreraID:number) {
    let uri = `${this.uriDetalleCarrera}/${detalleCarreraID}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}