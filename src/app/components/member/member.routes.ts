import { Routes } from '@angular/router';

import { CareersMemberComponent } from './careers/careers.component';
import { CareersMembersComponent } from './careers/careersMembers.component';
import { MembersMemberComponent } from './members/members.component';
import { RecordMemberComponent } from './record/record.component';
import { AccountComponent } from './account/account.component';

export const member_routes: Routes = [
  { path: 'members', component: MembersMemberComponent },
  { path: 'careers', component: CareersMemberComponent },
  { path: 'careers/:carreraID', component: CareersMembersComponent },
  { path: 'record', component: RecordMemberComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'members'}
];
