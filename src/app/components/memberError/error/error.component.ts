import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent {
  title = 'University Club';
  accounts:any [] = [];
  account:any = {
      UsuarioID: 0,
      Nombre: '',
      Apellido: '',
      Correo: ''
  }

  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ) { }

  ngOnInit() {
    this.initializeAccount();
  }

  //CARGAR CUENTA
  public initializeAccount() {
    this.usuarioService.getAccount().subscribe(data => {
      console.log(data);
      this.accounts = data;
      for(let x of this.accounts) {
        this.account.UsuarioID = x.UsuarioID;      
        this.account.Nombre = x.Nombre;
        this.account.Apellido = x.Apellido; 
        this.account.Correo = x.Correo; 
      }      
    });
  }

  //ELIMINAR CUENTA
  public deleteAccount(cuentaID:any){
    this.usuarioService.deleteUsuario(cuentaID)
    .subscribe(res => {
      if(res.estado) {
          localStorage.clear();
          this.router.navigate(['/home']);
      }
    });
  }
}
