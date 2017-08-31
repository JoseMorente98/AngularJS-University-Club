import { Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';

export const member_error_routes: Routes = [
  { path: 'error', component: ErrorComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'error'}
];
