import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//COMPONENTES
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register.component';

//COMPONENTES DE ADMINISTRADOR
import { AdministratorComponent } from './components/administrator/administrator.component';
import { NavbarComponent } from './components/administrator/navbar/navbar.component';
import { AdministratorsComponent } from './components/administrator/administrators/administrators.component';
import { FinanciersComponent } from './components/administrator/financiers/financiers.component';
import { MembersComponent } from './components/administrator/members/members.component';
import { CareersComponent } from './components/administrator/careers/careers.component';
import { CareersMembersAdminComponent } from './components/administrator/members/careersMembers.component';
import { MailComponent } from './components/administrator/mails/mails.component';

//COMPONENTES DE FINANCIERO
import { FinancierComponent } from './components/financier/financier.component';
import { RecordsMorososComponent } from './components/financier/records/records.component';
import { RecordsComponent } from './components/financier/records/record.component';
import { NavbarFinancierComponent } from './components/financier/navbar/navbar.component';
import { MembersFinancierComponent } from './components/financier/members/member.component';
import { FormMiembroComponent } from './components/financier/members/formPago.component';

//COMPONENTES DEL MIEMBRO
import { MemberComponent } from './components/member/member.component';
import { MembersMemberComponent } from './components/member/members/members.component';
import { NavbarMemberComponent } from './components/member/navbar/navbar.component';
import { CareersMemberComponent } from './components/member/careers/careers.component';
import { CareersMembersComponent } from './components/member/careers/careersMembers.component';
import { RecordMemberComponent } from './components/member/record/record.component';
import { AccountComponent } from './components/member/account/account.component';

//COMPONENTES DEL ERROR MIEMBRO
import { MemberErrorComponent } from './components/memberError/memberError.component';
import { NavbarErroComponent } from './components/memberError/navbar/navbar.component';
import { ErrorComponent } from './components/memberError/error/error.component';


//SERVICIOS
import { UsuarioService } from './services/usuario.service';
import { AuthGuardService } from './services/auth.service';
import { MiembroService } from './services/miembro.service';
import { CarreraService } from './services/carrera.service';
import { DetalleCarreraService } from './services/detalleCarrera.service';
import { MembresiaService } from './services/membresia.service';
import { CorreoService } from './services/correo.service';
//RUTAS
import { app_routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdministratorComponent,
    NavbarComponent,
    AdministratorsComponent,
    FinanciersComponent,
    MembersComponent,
    CareersComponent,
    MemberComponent,
    MembersMemberComponent,
    NavbarMemberComponent,
    FinancierComponent,
    RecordsComponent,
    NavbarFinancierComponent,
    MembersFinancierComponent,
    FormMiembroComponent,
    RecordsMorososComponent,
    CareersMemberComponent,
    RecordMemberComponent,
    CareersMembersComponent,
    CareersMembersAdminComponent,
    RegisterComponent,
    ErrorComponent,
    AccountComponent,
    MailComponent,
    NavbarErroComponent,
    MemberErrorComponent
  ],
  
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    app_routing
  ],
  providers: [
    UsuarioService,
    AuthGuardService,
    CarreraService,
    MiembroService,
    MembresiaService,
    DetalleCarreraService,
    CorreoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
