import { RouterModule, Routes } from '@angular/router';

//COMPONENTES
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/home/register.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { FinancierComponent } from './components/financier/financier.component';
import { MemberComponent } from './components/member/member.component';
import { MemberErrorComponent } from './components/memberError/memberError.component';
//RUTAS
import { admin_routes } from './components/administrator/administrator.routes';
import { financier_routes } from './components/financier/financier.routes';
import { member_routes } from './components/member/member.routes';
import { member_error_routes } from './components/memberError/memberError.routes';

//SERVICIOS
import { AuthGuardService } from './services/auth.service';

const APP_ROUTES:Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'administrator',
    component: AdministratorComponent,
    children: admin_routes,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'financier',
    component: FinancierComponent,
    children: financier_routes,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'member',
    component: MemberComponent,
    children: member_routes,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'member-error',
    component: MemberErrorComponent,
    children: member_error_routes,
    canActivate: [ AuthGuardService ]
  },
  { path: '**', pathMatch: 'full', redirectTo:'home'}
]

export const app_routing = RouterModule.forRoot(APP_ROUTES);