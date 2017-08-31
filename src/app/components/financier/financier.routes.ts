import { Routes } from '@angular/router';

import { RecordsComponent } from './records/record.component';
import { RecordsMorososComponent } from './records/records.component';
import { MembersFinancierComponent } from './members/member.component';
import { FormMiembroComponent } from './members/formPago.component';

export const financier_routes: Routes = [
  { path: 'records', component: RecordsComponent },
  { path: 'recordsMorosos', component: RecordsMorososComponent },
  { path: 'members', component: MembersFinancierComponent },
  { path: 'members/:usuarioID', component: FormMiembroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'members'}
];
