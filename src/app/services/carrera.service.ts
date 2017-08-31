import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarreraService {
  private uriCarrera:string;
  private headers:Headers;

  //CONSTRUCTOR
  constructor(
    private http:Http,
    private router: Router
  ) {
    this.uriCarrera = "http://localhost:3000/api/carreras";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
  }

  //OBTENER CARERRAS
  public getCarreras() {
    return this.http.get(this.uriCarrera, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  //OBTENER CARERRA
  public getCarrera(carreraID:any) {
    let uri = `${this.uriCarrera}/${carreraID}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  //NUEVA CARRERA
  public addCarrera(carrera:any) {
    let data = JSON.stringify(carrera);
    return this.http.post(this.uriCarrera, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ACTUALIZAR CARRERA
  public updateCarrera(carrera:any) {
    let uri = `${this.uriCarrera}/${carrera.CarreraID}`;
    let data = JSON.stringify(carrera);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ELIMINAR CARRERA
  public deleteCarrera(carreraID:number) {
    let uri = `${this.uriCarrera}/${carreraID}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}