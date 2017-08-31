import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MembresiaService {
  private uriMembresia:string;
  private headers:Headers;

  //CONSTRUCTOR
  constructor(
    private http:Http,
    private router: Router
  ) {
    this.uriMembresia = "http://localhost:3000/api/membresias";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
  }

  //OBTENER MEMBRESIAS
  public getMembresias() {
    return this.http.get(this.uriMembresia, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getAllMembresias() {
    let uri = `${this.uriMembresia}All`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  //OBTENER MEMBRESIA
  public getMembresia(membresiaID:any) {
    let uri = `${this.uriMembresia}/${membresiaID}`;
    return this.http.get(uri, { headers: this.headers })
    .map(res => res.json());
  }

  //NUEVA MEMBRESIA
  public addMembresia(membresia:any) {
    let data = JSON.stringify(membresia);
    return this.http.post(this.uriMembresia, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ACTUALIZAR MEMBRESIA
  public updateMembresia(membresia:any) {
    let uri = `${this.uriMembresia}/${membresia.MembresiaID}`;
    let data = JSON.stringify(membresia);

    return this.http.put(uri, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ELIMINAR MEMBRESIA
  public deleteMembresia(membresiaID:number) {
    let uri = `${this.uriMembresia}/${membresiaID}`;
    return this.http.delete(uri, { headers: this.headers })
    .map(res => res.json());
  }

}