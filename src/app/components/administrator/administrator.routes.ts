import { Routes } from '@angular/router';

import { AdministratorsComponent } from './administrators/administrators.component';
import { FinanciersComponent } from './financiers/financiers.component';
import { MembersComponent } from './members/members.component';
import { CareersMembersAdminComponent } from './members/careersMembers.component';
import { CareersComponent } from './careers/careers.component';
import { MailComponent } from './mails/mails.component';

export const admin_routes: Routes = [
  { path: 'administrators', component: AdministratorsComponent },
  { path: 'financiers', component: FinanciersComponent },
  { path: 'members', component: MembersComponent },
  { path: 'members/:usuarioID', component: CareersMembersAdminComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'mails', component: MailComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'administrators'}
];
