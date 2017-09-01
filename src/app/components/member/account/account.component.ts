import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

//COMPONENTES
import { UsuarioService } from '../../../services/usuario.service';

//JQUERY
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-account-member',
  templateUrl: './account.component.html',
  
})
export class AccountComponent implements OnInit {
  accounts:any [] = [];
  formAccount:FormGroup;
  account:any = {
      UsuarioID: 0,
      Nombre: '',
      Apellido: '',
      Correo: ''
  }
  profile:any;
  notificacion:any = {
    estado: false,
    mensaje: ""
  }
  notificacionError:any = {
    estado: false,
    mensaje: ""
  }
  imageUrl: any;

  constructor(
    private usuarioService:UsuarioService,
    private router:Router
  ) { }

  ngOnInit() {
    this.formAccount = new FormGroup({
      'Imagen': new FormControl('', Validators.required)
    });
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

  imageUpload(e) {
    let reader = new FileReader();
    //get the selected file from event
    let file = e.target.files[0];
    reader.onloadend = () => {
      //Assign the result to variable for setting the src of image element
      this.imageUrl = reader.result;
      
    }
    reader.readAsDataURL(file);
    console.log(file.readAsBinaryString);
  }
}
