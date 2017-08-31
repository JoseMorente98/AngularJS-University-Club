import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  //CONSTRUCTOR
  constructor(
    private router:Router,
    private usuarioService:UsuarioService
  ) {  }

  //VALIDAR EL USUARIO
  canActivate() {
    if(this.usuarioService.validateUsuario()) {
      console.log("Paso el GUARD");
      return true;
    } else {
      console.log("Bloqueado por el GUARD");
      return false;
    }
  }
}