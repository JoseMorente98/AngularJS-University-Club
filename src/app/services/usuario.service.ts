import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//Inyectable
@Injectable()
export class UsuarioService {
  private uriUsuario:string;
  private headers:Headers;
  usuarios:any[];

  //Constructor
  constructor(
    private http:Http,
    private router: Router
  ) {
    this.uriUsuario = "http://localhost:3000";
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
  }

  //AUTENTICAR AL USUARIO
  public authentication(usuario:any) {
    let uriUsuario = `${this.uriUsuario}/auth/`;
    let data = JSON.stringify(usuario);

    return this.http.post(uriUsuario, data, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  //METODO QUE VERIFICA EL TOKEN
  public validateUsuario():boolean {
    if(localStorage.getItem('token')) {
      return true;
    } else{
      this.router.navigate(['/home/']);
    }
    return false;
  }

  //OBTENER USUARIOS
  public getUsuarios() {
    let uriUsuario = `${this.uriUsuario}/api/usuarios`;
    return this.http.get(uriUsuario, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  public getAccount() {
    let uriUsuario = `${this.uriUsuario}/api/usuariosAccount`;
    return this.http.get(uriUsuario, { headers: this.headers })
    .map(res => {
      return res.json();
    });
  }

  //OBTENER USUARIO
  public getUsuario(usuarioID:any) {
    let uriUsuario = `${this.uriUsuario}/api/usuarios/${usuarioID}`;
    return this.http.get(uriUsuario, { headers: this.headers })
    .map(res => res.json());
  }

  //AGREGAR USUARIO
  public addUsuario(usuario:any) {
    let uriUsuario = `${this.uriUsuario}/api/usuarios`;
    let data = JSON.stringify(usuario);
    return this.http.post(uriUsuario, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ACTUALIZAR USUARIO
  public updateUsuario(usuario:any) {
    let uriUsuario = `${this.uriUsuario}/api/usuarios/${usuario.UsuarioID}`;
    let data = JSON.stringify(usuario);

    return this.http.put(uriUsuario, data, { headers: this.headers })
    .map(res => res.json());
  }

  public updateAccount(usuario:any) {
    let uriUsuario = `${this.uriUsuario}/api/usuariosProfile/`;
    let data = JSON.stringify(usuario);
    return this.http.put(uriUsuario, data, { headers: this.headers })
    .map(res => res.json());
  }

  //ELIMINAR USUARIO
  public deleteUsuario(usuarioID:number) {
    let uriUsuario = `${this.uriUsuario}/api/usuarios/${usuarioID}`;
    return this.http.delete(uriUsuario, { headers: this.headers })
    .map(res => res.json());
  }

  //ACTUALIZAR ESTADO
  public updateActive(usuarioID:number) {
    let uriUsuario = `${this.uriUsuario}/api/usuarios/active/${usuarioID}`;
    return this.http.put(uriUsuario, { headers: this.headers })
    .map(res => res.json());
  }
}